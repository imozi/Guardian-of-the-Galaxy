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
          label: REACTIONS.jupiter.label,
          node: <img height={17} src={REACTIONS.jupiter.srcImg} />,
          key: REACTIONS.jupiter.label,
        },
        {
          label: REACTIONS.uranus.label,
          node: <img height={17} src={REACTIONS.uranus.srcImg} />,
          key: REACTIONS.uranus.label,
        },
        {
          label: REACTIONS.earth.label,
          node: <img height={17} src={REACTIONS.earth.srcImg} />,
          key: REACTIONS.earth.label,
        },
        {
          label: REACTIONS.blackHole.label,
          node: <img height={17} src={REACTIONS.blackHole.srcImg} />,
          key: REACTIONS.blackHole.label,
        },
        {
          label: REACTIONS.saturn.label,
          node: <img height={17} src={REACTIONS.saturn.srcImg} />,
          key: REACTIONS.saturn.label,
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
