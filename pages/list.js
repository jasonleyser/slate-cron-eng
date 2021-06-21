import Head from 'next/head'

const users_twitter = [
    { account: 'archillect', collection: 'photos', freq: '2 hours', run_time: 'xx:26' },
    { account: 'gradient', collection: 'bot', freq: '2 hours', run_time: 'xx:26' },
    { account: 'moma', collection: 'objects', freq: '4 hours', run_time: '10:05, 2:05, 6:05' },
    { account: 'jet', collection: 'photos', freq: '4 hours', run_time: '10:05, 2:05, 6:05' },
    { account: 'wayback', collection: 'exe', freq: '6 hours', run_time: '2:22, 8:22' },
    { account: '90snba', collection: 'photos', freq: '6 hours', run_time: '10:00, 6:00' },
    { account: 'photoinreallife', collection: 'locations', freq: '6 hours', run_time: '10:05, 2:05, 6:05' },
    { account: 'artistkandinsky', collection: 'art', freq: '12 hours', run_time: '10:05, 2:05, 6:05' },
];

const users_reddit = [
    { account: 'graphicdesign', collection: 'visuals', freq: '3 hours', run_time: 'xx:26' },
    { account: 'analog', collection: 'photography', freq: '3 hours', run_time: 'xx:26' },
    { account: 'redditart', collection: 'glitch', freq: '3 hours', run_time: 'xx:26' },
    { account: 'redditart', collection: 'pictures', freq: '4 hours', run_time: 'xx:26' },
    { account: 'redditart', collection: 'typography', freq: '4 hours', run_time: 'xx:26' },
    { account: 'mechanicalkeyboards', collection: 'photos', freq: '4 hours', run_time: 'xx:26' },
    { account: 'sports', collection: 'photography', freq: '4 hours', run_time: 'xx:26' },
];

export default function List() {
    return (
      <>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
        </Head>
        <div style={{ position: 'absolute', backgroundColor: "#fdfdfd", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Inter' }}>
          <div>
            <table style={{ borderSpacing: '0 50px', width: '500px', border: '1px solid #fdfdfd', borderCollapse: 'collapse', overflow: 'hidden', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #cacaca' }}>
                  <th><img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" width="24px" /></th>
                  <th>Account</th>
                  <th>Frquency</th>
                </tr>
              </thead>
              {users_twitter.map((user) => (
                <tr style={{ borderSpacing: '20px' }}>
                  <th></th>
                  <th>
                    <a style={{ textDecoration: 'none', color: '#0566BB', marginTop: '8px' }} target="_blank" href={`https://slate.host/${user.account}/${user.collection}`}>
                      @{user.account}/{user.collection}
                    </a>
                  </th>
                  <th>{user.freq}</th>
                </tr>
              ))}
            </table>
          </div>
          <br /><br /><br />
          <div>
            <table style={{ borderSpacing: '0 50px', width: '500px', border: '1px solid #fdfdfd', borderCollapse: 'collapse', overflow: 'hidden', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #cacaca' }}>
                  <th><img src="https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2" width="20px" /></th>
                  <th>Account</th>
                  <th>Frquency</th>
                </tr>
              </thead>
              {users_reddit.map((user) => (
                <tr style={{ borderSpacing: '20px' }}>
                  <th></th>
                  <th>
                    <a style={{ textDecoration: 'none', color: '#0566BB', marginTop: '8px' }} target="_blank" href={`https://slate.host/${user.account}/${user.collection}`}>
                      @{user.account}/{user.collection}
                    </a>
                  </th>
                  <th>{user.freq}</th>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </>
    )
}