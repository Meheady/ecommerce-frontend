import WebsiteLayout from "../layout/website/websiteLayout";

export default function Index() {


  return (
    <>
      <h2>Website</h2>
    </>
  )
}

Index.getLayout = function getLayout(page) {
  return (
      <WebsiteLayout>
        {page}
      </WebsiteLayout>
  )
}
