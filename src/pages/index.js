import AdminLayout from "../layout/admin/adminLayout";
import {useEffect} from "react";
import {getAllUser} from "../service/userService";


export default function Home() {

    useEffect(() => {
        getAllUser()
            .then((data)=>{
                console.log(data);
            })
            .catch((error)=>{
                console.log(error)
            })
    }, []);

  return (
    <>
      <h2>Dashboard</h2>
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
      <AdminLayout>
        {page}
      </AdminLayout>
  )
}
