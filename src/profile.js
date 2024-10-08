import { React, useState, useEffect } from "react";
// import axios from "axios";
// import './dashboard.css'
const Profile = () => {
  const [profileImage, setProfileImage] = useState('');
    let [userData, setUserData] = useState({})
    // let {id} = useParams()
  useEffect(() => {
    let ApiUrl = 'http://localhost:5000/getdata/227'
    console.log(ApiUrl)
      fetch(ApiUrl)
      .then(response => response.json())
      .then(data => {
        let userData = data.message
        console.log(userData)
        setUserData(userData)
        setProfileImage(`http://localhost:5000/uploads/${userData.filename}`)
      })
  //   const storedUser = sessionStorage.getItem('user');
  //   // console.log('Stored user:', storedUser);
  
  //   if (storedUser) {
  //     try {
  //       const userData = JSON.parse(storedUser);
  //       // console.log('Parsed user data:', userData);
        
  //       if (userData.image) {
  //         // Assuming the image is stored as a base64 string in userData
  //         setProfileImage(userData.image);
  //       } else if (userData.filename) {
  //         // If filename exists, use the server URL to fetch the image
  //         setProfileImage(`http://localhost:5000/uploads/${userData.filename}`);
  //       }
  //     } catch (error) {
  //       console.error('Error parsing stored user data:', error);
  //     }
  //   } else {
  //     console.log('No user data found in session storage');
  //   }
  }, [])
  return (
    <>
      <div className="main-body main-body-bg" style={{}}>
        <div className="">
          <div className="top-menu top-color">
            <div className="row">
              <div className="col-xs-12 text-center">
                <div className="col-xs-4">
                  <div className="top-menu-left">
                    {/* <a href="https://looplink.me/setting">
                    <p className="menu_icon">
                      <i className="fas fa-bars" />
                    </p>
                  </a> */}
                  </div>
                </div>
                <div className="col-xs-4">
                  <div className="">
                    <a href="https://looplink.me/">
                      <img
                        src="https://looplink.me/public/assets/front/images/logo_white_only.png"
                        alt="logo"
                        style={{ maxWidth: 80, marginTop: 15 }}
                      />
                      <p
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          textDecoration: "none"
                        }}>
                        InFlow
                      </p>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="my-profile">
          <div className="">
            <div className="row">
              <div className="col-xs-12">
                <div
                  className="my-profile-photo"
                  style={{ marginTop: "-45px", width: "50%" }}
                >
                  <img
                    src={profileImage
                      || "https://looplink.me/public/assets/front/images/sample-img.jpg"}
                    alt="photo"
                  />
                </div>
                <div className="text-right pt-2 pl-2 pr-2">
                  <img
                    src="https://looplink.me/public/assets/img/qr-code.svg"
                    width={45}
                    style={{ marginTop: "-40px", cursor: "pointer" }}
                    className="showqrcode"
                    target="#ShowQRCode"
                  />
                </div>
                <h2 className="text-center">
                    <strong>{userData.Profilename}</strong>         
                
                 </h2>
                <p style={{ wordWrap: "break-word" }}>{userData.Bio}</p>
                <div className="text-center">

                  <a href="" style={{ borderRadius: '25px' }}
                    className="btn btn-custom-black"
                  >
                    Add to Contacts &nbsp;<i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="javascript:;"
                    className="btn btn-custom-white save_profile hide"
                  >
                    Save
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-xs-12">
            <div className="text-center" style={{ marginTop: 15 }}>
              <a href="https://looplink.me/logout" class="btn btn-custom-black ">Direct Off</a>
              <a
                href=""
                className="btn btn-custom-black direct_on_off"
                data-direct-on-off={1}
              >
                Quick Link On
              </a>
            </div>
          </div>
        </div> */}
        <div className="grid-buttons">
          <div className="">
            <div className="row" id="sortable">
              <div className="col-xs-4">
                <div className="icon-box-outer">
                  <span
                    href="javascript:;"
                    data-flag="contact_card"
                    className="close delete_social hide"
                  >
                    <i className="fa fa-times-circle" />
                  </span>
                  <div className="my-icon-box equal-box ">
                    <a
                      href="https://looplink.me/v_card/FelixStephenson"
                      className=""
                      data-social-name="contact_card"
                    >
                      {" "}
                      <img
                        src="https://looplink.me/public/uploads/social_icons/contact_card.png"
                        alt="photo"
                        className="box-social-img"
                      />
                    </a>
                    <input
                      type="hidden"
                      name="ordering[]"
                      defaultValue="contact_card"
                    />
                  </div>
                  <div className="icon-box-title">Contact Card</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="add_social_link">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title" />
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form
                name="add"
                method="post"
                action="https://looplink.me/home/add_social"
                id="add"
                className="form-horizontal"
                encType="multipart/form-data"
              >
                <div className="row append_social"></div>
              </form>
            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              <button type="submit" className="btn btn-custom-black add_social">
                Add
              </button>
              <button
                type="button"
                className="btn btn-custom-white"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="edit_social_link">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title edit-modal-title" />
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form
                name="edit"
                method="post"
                action="https://looplink.me/home/edit_social"
                id="edit"
                className="form-horizontal"
                encType="multipart/form-data"
              >
                <div className="row append_edit_social"></div>
              </form>
            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              <button type="submit" className="btn btn-custom-black update_social">
                Update
              </button>
              <button
                type="button"
                className="btn btn-custom-white"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="delete_social_link">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Delete Confirmation?</h4>
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <p>Are You Sure To Delete Social Link?</p>
            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-circle btn-custom-white "
                id="yesDelete"
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-circle btn-custom-white"
                data-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="showQRCode">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">InFlow Profile</h4>
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <p className="text-center">
                Scan this code with any camera to share your InFlow profile
              </p>
              <div className="splash_title text-center">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAABvAQMAAADYCwwjAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABGUlEQVQ4jdXUsY3EIBAF0H8iIDMNWHIbZLTENbBnGrBbIqMNJBowGYG1c2PLu7rkPKSLnDyk0TD428AnLkO0kgqkiLLIAWrW2SQ1o4OuhDTClrV1cXaKUj/5YH2ECmkKsbwPeUOed7GFn/f4Nzx2Ytn0n8v8nyaVEKmmV6NbDjp7qyrh4SDSRFpjqVE9rUyuBbi2UMwioUtt04LrVPccHB42/7Trcu7J89amNrd7KxMWHjRj2jo4HDnJHvk7QqblXvA6D06mSRQaEeEr5g5yWkY4VRs6OFUaBxzlIs/Q7jyCiTI5sYFG78rawfP73U3KZwwkurLwC9J0JUeknZ56BLrIjTz2h+sg1OKODJgm8/ibca6OxELk561f7KPt5NnN3pEAAAAASUVORK5CYII="
                  style={{ textAlign: "center", maxWidth: 200, width: "100%" }}
                />
              </div>
            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-circle btn-custom-white"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Profile;
