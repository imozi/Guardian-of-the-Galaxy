import { ReactionBar } from '@/components/ReactionBar/ReactionBar'
import { REACTIONS } from '@/core/consts'
import {
  useAddAnswerMutation,
  useAddReactionMutation,
  useGetMessagesQuery,
  useGetReactionsQuery,
} from '@/store/forum/forum.api'
import { useGetUserQuery } from '@/store/user/user.api'
import { ReactionCounter } from '@charkour/react-reactions'
import { AllHTMLAttributes, FC, useEffect, useRef, useState } from 'react'
import { AnswerDTO } from '../../../types/api/forum'
import { Button } from '../Button'

type PostProps = {
  author: string
  avatar: string
  text: string
  postId: number
  topicId: number
  answers?: AnswerDTO
} & AllHTMLAttributes<HTMLDivElement>

export const Post: FC<PostProps> = ({ answers, ...props }) => {
  const { data: reactions, refetch } = useGetReactionsQuery(`${props.postId}`, {
    refetchOnMountOrArgChange: true,
  })

  const { data } = useGetUserQuery()

  const [createAnswer, { isSuccess: isSuccessAddAnswer }] =
    useAddAnswerMutation()

  const [createReaction, { isSuccess }] = useAddReactionMutation()

  const [newPost, setNewPost] = useState(false)

  const { data: message, refetch: refetchGetMessage } = useGetMessagesQuery(
    `${props.topicId}`,
    { refetchOnMountOrArgChange: true }
  )

  const refAnswer: any = useRef<HTMLDivElement>(null)

  const onClick = () => {
    if (newPost && refAnswer.current.textContent != '') {
      createAnswer({
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
  }, [isSuccessAddAnswer, refetchGetMessage])

  const onSelectReaction = (key: string) => {
    createReaction({ label: key, messageId: props.postId })
  }

  useEffect(() => {
    refetch()
  }, [isSuccess, refetch])

  return (
    <div className="post-wrapper">
      <div className="post">
        <div className="post__author">
          <img src={props.avatar} alt="avatar" className="post__photo" />
          <div className="post__author-name">{props.author}</div>
        </div>
        <p className="post__text">{props.text}</p>
        <Button className="btn btn-answer" type="submit" onClick={onClick}>
          {!newPost ? 'Answer' : 'Send'}
        </Button>
        <div className="reaction-wrapper">
          <ReactionBar onSelect={onSelectReaction} />
        </div>
        <ReactionCounter
          reactions={
            reactions?.rows.map(({ label }) => ({
              label: label,
              node: <img height={15} src={REACTIONS[label].srcImg} />,
              by: '',
            })) || []
          }
          style={{ display: !reactions ? 'none' : 'flex' }}
          showTotalOnly={true}
          showReactsOnly={reactions?.rows.length < 1}
          className="reaction-count"
          iconSize={19}
          bg="#AAA"
        />
      </div>

      <form className="form post__form">
        <div
          ref={refAnswer}
          contentEditable={true}
          suppressContentEditableWarning={true}
          className={!newPost ? 'post__field' : 'post__field-active'}></div>
      </form>

      {answers &&
        answers.map(({ text, id }) => {
          return (
            <div key={id} className="post post__answer">
              <p className="post__text">{text}</p>
            </div>
          )
        })}
    </div>
  )
}
