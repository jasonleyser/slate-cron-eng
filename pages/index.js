import Head from 'next/head'

export default function Index() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
      </Head>

      <div style={{ position: 'absolute', backgroundColor: "#fdfdfd", width: '100vw', height: '100vh', top: '0', left: '0', fontFamily: 'Inter' }}>
        <div style={{ position: 'absolute', width: '40px', height: '40px', left: '48%', top: '48%' }}>
          <a href="/list" style={{ color: '#000' }}>
            <svg
              viewBox="0 0 447 516"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M446.353 386.57L362.353 435.038V391.124L408.353 364.528V269.318L222.853 162.225V118.312L446.353 247.363V386.57ZM408.353 151.624V204.624L446.353 226.624V129.624L222.853 0.624146L102.353 70.1241V210.463L306.353 328.124V423.455L222.853 471.624L38.3531 365.124V312.124L0.353149 290.124V387.124L222.853 515.624L344.353 445.43V306.277L140.353 188.456V92.0493L222.853 44.4236L408.353 151.624ZM0.353149 129.124L84.3531 80.4781V124.419L38.3531 151.124V247.369L222.853 353.863V397.789L0.353149 269.323V129.124Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}