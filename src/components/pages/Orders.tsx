import useOrders from "@components/hooks/useOrders";
import  ProductInfo  from "@components/ecommerce/ProducrInfo/ProductInfo";
import { Heading } from "@components/coomon";
import Loading from "@components/feedback/Loading/Loading";
import { Table, Modal } from "react-bootstrap";


const Orders = () => {
  const {
    loading,
    error,
    ordersList,
    showModal,
    selectedProduct,
    viewDetailsHandler,
    handleCloseModal,
  } = useOrders();

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              style={{ marginBottom: "10px" }}
              quantity={el.quantity}
            />
          ))}
        </Modal.Body>
      </Modal>
      <Heading title="My Order" />
      <Loading status={loading} error= {error} type="category">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Items</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((el) => (
            <tr key={el.id}>
              <td>#{el.id}</td>
              <td>
                {el.items.length} Item(s)
                {" / "}
                <span
                  onClick={() => viewDetailsHandler(el.id)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Product Details
                </span>
              </td>
              <td>{el.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Loading>
    </>
  )
};

export default Orders;