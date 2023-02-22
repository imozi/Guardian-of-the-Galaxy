import { ReactionBarSelector } from '@charkour/react-reactions'
import { FC } from 'react'
import { REACTIONS } from '../../core/consts/index'

type ReactionProps = {
  onSelect: (key: string) => void
}

export const ReactionBar: FC<ReactionProps> = ({ ...props }) => {
  return (
    <ReactionBarSelector
      reactions={[
        {
          label: REACTIONS.cool.label,
          node: <img height={17} src={REACTIONS.cool.srcImg} />,
          key: REACTIONS.cool.label,
        },
        {
          label: REACTIONS.rofl.label,
          node: <img height={17} src={REACTIONS.rofl.srcImg} />,
          key: REACTIONS.rofl.label,
        },
        {
          label: REACTIONS.sad.label,
          node: <img height={17} src={REACTIONS.sad.srcImg} />,
          key: REACTIONS.sad.label,
        },
        {
          label: REACTIONS.like.label,
          node: <img height={17} src={REACTIONS.like.srcImg} />,
          key: REACTIONS.like.label,
        },
        {
          label: REACTIONS.fire.label,
          node: <img height={17} src={REACTIONS.fire.srcImg} />,
          key: REACTIONS.fire.label,
        },
        {
          label: REACTIONS.rocket.label,
          node: <img height={17} src={REACTIONS.rocket.srcImg} />,
          key: REACTIONS.rocket.label,
        },
      ]}
      iconSize={17}
      style={{
        backgroundColor: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
      {...props}
    />
  )
}
