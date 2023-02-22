import { ReactionBar } from '@/components/ReactionBar/ReactionBar'
import {
  API_RESOURCES_URL,
  REACTIONS,
  REACTIONS_ICON_SIZE,
  USER_AVATAR_DEFAULT,
} from '@/core/consts'
import {
  useAddAnswerMutation,
  useAddReactionMutation,
  useGetMessagesQuery,
} from '@/store/forum/forum.api'
import { useGetUserQuery } from '@/store/user/user.api'
import { ReactionCounter } from '@charkour/react-reactions'
import { AllHTMLAttributes, FC, useEffect, useRef, useState } from 'react'
import { AnswerDTO, ReactionDTO } from '@/types/api/forum'
import { Button } from '../Button'

type PostProps = {
  author: string
  avatar: string
  text: string
  postId: number
  topicId: number
  answers?: AnswerDTO
  reactions?: ReactionDTO
} & AllHTMLAttributes<HTMLDivElement>

export const Post: FC<PostProps> = ({
  answers = [],
  reactions = [],
  ...props
}) => {
  const { data } = useGetUserQuery()

  const [
    createAnswer,
    { isSuccess: isSuccessAddAnswer, isLoading: isAddAnswerLoading },
  ] = useAddAnswerMutation()

  const [createReaction, { isSuccess: isSuccessAddReaction }] =
    useAddReactionMutation()

  const [newPost, setNewPost] = useState(false)

  const {
    data: message,
    isLoading: isMessageLoading,
    isFetching: isMessageFetching,
    refetch: refetchGetMessage,
  } = useGetMessagesQuery(`${props.topicId}`, {
    refetchOnMountOrArgChange: true,
  })

  const refAnswer: any = useRef<HTMLDivElement>(null)

  const onClick = async () => {
    if (newPost && refAnswer.current.textContent != '') {
      await createAnswer({
        userId: data!.id,
        text: refAnswer.current.textContent,
        messageId: props.postId,
      })
    }
    setNewPost(!newPost)
    refAnswer.current.textContent = ''
  }

  useEffect(() => {
    refetchGetMessage()
  }, [isSuccessAddReaction, isSuccessAddAnswer, refetchGetMessage])

  const onSelectReaction = (key: string) => {
    createReaction({ label: key, messageId: props.postId })
  }

  return (
    <div className="post-wrapper">
      <div className="post">
        <div className="post__author">
          <img src={props.avatar} alt="avatar" className="post__photo" />
          <div className="post__author-name">{props.author}</div>
        </div>
        <p className="post__text">{props.text}</p>
        {newPost ? (
          <Button
            small={true}
            loading={
              isAddAnswerLoading || isMessageLoading || isMessageFetching
            }
            onClick={onClick}>
            Send
          </Button>
        ) : (
          <Button small={true} onClick={onClick}>
            Answer
          </Button>
        )}
        <div className="reaction-wrapper">
          <ReactionBar onSelect={onSelectReaction} />
        </div>
        <ReactionCounter
          reactions={
            reactions.map(({ label }) => ({
              label: label,
              node: <img src={REACTIONS[label].srcImg} />,
              by: '',
            })) || []
          }
          style={{ display: !reactions ? 'none' : 'flex' }}
          showTotalOnly={true}
          showReactsOnly={!reactions.length}
          className="reaction-count"
          iconSize={REACTIONS_ICON_SIZE}
        />
      </div>

      <form className="form post__form">
        <div
          ref={refAnswer}
          contentEditable={true}
          suppressContentEditableWarning={true}
          className={!newPost ? 'post__field' : 'post__field-active'}></div>
      </form>

      {answers?.map(({ text, id, user }) => {
        return (
          <div key={id} className="post post__answer">
            <div className="post__author">
              <img
                src={
                  user.avatar
                    ? `${API_RESOURCES_URL}/${user.avatar}`
                    : USER_AVATAR_DEFAULT
                }
                alt="avatar"
                className="post__photo"
              />
              <div className="post__author-name">{user.name}</div>
            </div>
            <p className="post__text">{text}</p>
          </div>
        )
      })}
    </div>
  )
}
