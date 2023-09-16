import WebsiteLayout from "../layout/website/websiteLayout";
import Product from "../component/website/product/product";

export default function Index() {


  return (
    <>
      <Product/>
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
