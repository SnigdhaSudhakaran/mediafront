import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addCategory, deleteCategory, getCategory, getVideos, updateCategory } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2 } from 'react-feather';
import VideoCard from './VideoCard';



function Category({ handleResponse }) {

  const [uploadCategory, setUploadCategory] = useState({
    id: "", caption: "", allVideos: []
  });


  const [allCategory, setallCategory] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInput = (e) => {

    const { name, value } = e.target
    setUploadCategory({ ...uploadCategory, [name]: value })
  }
  console.log(uploadCategory);


  const handleAdd = async (e) => {
    e.preventDefault()
    const { id, caption } = uploadCategory

    if (!id || !caption) {
      toast.warning("please fill the form completely", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    else {
      let response = await addCategory(uploadCategory)

      if (response.status >= 200 && response.status < 300) {
        handleResponse(response.data);
        setShow(false)

        toast.success("video uploaded successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })

        getallCategory()
      }

      else {
        toast.error("please provide a unique id", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    }
  }

  useEffect(() => {

    getallCategory()

  }, [])


  const getallCategory = async () => {

    // api call of category

    const response = await getCategory()

    // console.log(response.data);
    setallCategory(response.data)
  }
  console.log(allCategory);

const handleDeleteCategory=async(e,id)=>{
  e.preventDefault()

    // api call for delete category

  const res=await deleteCategory(id)
  console.log(res);
  getallCategory()
}

// defining onDragOver

const dragOver=(e)=>{
  e.preventDefault()
  console.log("Dragging over the category");
}

const dropped=async(e,categoryId)=>{
  console.log("categoryid",categoryId);

  let sourceCardId=e.dataTransfer.getData("cardId")
  console.log("source cardid",sourceCardId);

   const {data} = await getVideos(sourceCardId)
   console.log(data);

   let selectedCategory=allCategory.find(category=>category.id==categoryId)
   console.log("target categoryDetails",selectedCategory);
   selectedCategory.allVideos.push(data)

   console.log("updated category details",selectedCategory);
    await updateCategory(categoryId,selectedCategory)
   getallCategory()
}

  return (
    <>
      <div className='d-grid'>
        <div onClick={handleShow} className='btn btn-dark m-2'>Add category</div>
      </div>

      {
        allCategory.map(category => (

          <div droppable onDragOver={e=>dragOver(e)} onDrop={e=>dropped(e,category?.id)}>

            <div className='d-flex justify-content-between border rounded mt-3 p-3'>

              <h4>{category?.caption}</h4>
              <span onClick={e=>handleDeleteCategory(e,category?.id)}><Trash2 color='red' /> </span>

            <Row>

                {
                  category?.allVideos.map((card)=>(

                    <Col>

                    <VideoCard card={card} insideCategory={true} />

                    </Col>
                  ))
                }

            </Row>

            </div>
          </div>

        ))
      }


      {/* modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            <FloatingLabel className='mb-3' controlId="floatingid" label="id">
              <Form.Control name='id' onChange={setInput} type="text" placeholder="category id" />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingcaption" label="caption">
              <Form.Control name='caption' onChange={setInput} type="text" placeholder="caption" />
            </FloatingLabel>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </>
  )
}

export default Category