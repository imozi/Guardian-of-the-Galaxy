import { Layout } from '../../components/Layout'
import { UserField } from '../../components/UI/UserField'
import { useNavigate } from 'react-router-dom';

export const Leaderboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="leaderboard">
        <h2 className="leaderboard__title">Leaderboard</h2>
        <div className="leaderboard__wrapper">
          <div className="leaderboard__links">
            <a className="link" onClick={() => navigate(-1)}>
              Back
            </a>
          </div>
          <div className="leaderboard__user-field">
            <div className="leaderboard__names">
                <h3 className="leaderboard__name">USERS</h3>
                <h3 className="leaderboard__name">SCORS</h3>
            </div>
            <UserField
              number={1}
              author="IloveFnd"
              avatar="https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg"
              score={553}></UserField>
            <UserField
              number={2}
              author="IloveFnd"
              avatar="https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg"
              score={330}></UserField>
            <UserField
              number={3}
              author="IloveFnd"
              avatar="https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg"
              score={198}></UserField>
          </div>
        </div>
      </div>
    </Layout>
  )
}
