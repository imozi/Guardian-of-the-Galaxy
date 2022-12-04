import { Layout } from '../../components/Layout'
import { UserField } from '../../components/UI/UserField'

export const Lidearbord = () => {
  return (
    <Layout>
      <div className="lidearbord">
        <h2 className="lidearbord__title">Lidearbord</h2>
        <div className="lidearbord__wrapper">
          <div className="lidearbord__links">
            <a href="#" className="link">
              Back
            </a>
          </div>
          <div className="lidearbord__user-field">
            <div className="lidearbord__names">
                <h3 className="lidearbord__name">USERS</h3>
                <h3 className="lidearbord__name">SCORS</h3>
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
