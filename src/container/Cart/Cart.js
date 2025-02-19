import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DecrementQut, IncrementQut, RemoveProduct } from '../../redux/Slice/cartSlice';

export default function Cart() {

  const productselector = useSelector((state => state.product));
  console.log(productselector);

  const cartSelecter = useSelector(state => state.carts)
  console.log("CartSelecter", cartSelecter);

  const dispatch = useDispatch()

  const [count, setCount] = useState(1)

  const cartData = cartSelecter.cart?.map((v) => {
    const pdata = productselector.product?.find((p) => p._id === v.pid)

    if (pdata) {
      return {
        ...pdata,
        Qut: v.Qut
      }
    }
  })

  console.log("cartData", cartData);

  const total_price = cartData?.reduce((acc, v, i) => acc + v.Qut * v.price, 0)
  console.log("tp", total_price);

  const handleIncre = (id) => {
    console.log("increment_id", id);
    dispatch(IncrementQut({ pid: id }))
  }

  const handleDecre = (id) => {
    dispatch(DecrementQut({ pid: id }))
  }

  const handleremove = (id) => {
    dispatch(RemoveProduct({ pid: id }))
  }

  return (
    <div className="container-fluid py-5" style={{ marginTop: '60px' }}>
      <div className="container py-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Products</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>

            <tbody>

              {
                cartData.map((v) => (
                  <tr>
                    <>
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img src={'http://localhost:8000/' + v?.product_img} className="img-fluid me-5 rounded-circle" style={{ width: 100, height: 90 }} alt="Image" />
                        </div>
                      </th>
                      <td>
                        <p className="mb-0 mt-4">{v?.name}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{v?.price + ' ₹'}</p>
                      </td>
                      <td>
                        <div className="input-group quantity mt-4" style={{ width: 100 }}>
                          <div className="input-group-btn">
                            <button className="btn btn-sm btn-minus rounded-circle bg-light border"
                              onClick={() => handleDecre(v._id)}
                              disabled={v?.Qut <= 1}
                            >
                              <i className="fa fa-minus" />
                            </button>
                          </div>
                          <p>{v?.Qut}</p>
                          {/* <input type="text" className="form-control form-control-sm text-center border-0" defaultValue={1} /> */}
                          <div className="input-group-btn">
                            <button className="btn btn-sm btn-plus rounded-circle bg-light border"
                              onClick={() => handleIncre(v._id)}
                            >
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        {

                          <p className="mb-0 mt-4">{v?.price * v?.Qut + ' ₹'} </p>
                        }

                      </td>
                      <td>
                        <button className="btn btn-md rounded-circle bg-light border mt-4"
                          onClick={() => handleremove(v._id)}
                        >
                          <i className="fa fa-times text-danger" />
                        </button>
                      </td>
                    </>
                  </tr>
                )
                )
              }

            </tbody>


            {/* <tbody>
              <tr>
                <th scope="row">
                  <div className="d-flex align-items-center">
                    <img src="img/vegetable-item-3.png" className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                  </div>
                </th>
                <td>
                  <p className="mb-0 mt-4">Big Banana</p>
                </td>
                <td>
                  <p className="mb-0 mt-4">2.99 $</p>
                </td>
                <td>
                  <div className="input-group quantity mt-4" style={{ width: 100 }}>
                    <div className="input-group-btn">
                      <button className="btn btn-sm btn-minus rounded-circle bg-light border">
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <input type="text" className="form-control form-control-sm text-center border-0" defaultValue={1} />
                    <div className="input-group-btn">
                      <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="mb-0 mt-4">2.99 $</p>
                </td>
                <td>
                  <button className="btn btn-md rounded-circle bg-light border mt-4">
                    <i className="fa fa-times text-danger" />
                  </button>
                </td>
              </tr>

              <tr>
                <th scope="row">
                  <div className="d-flex align-items-center">
                    <img src="img/vegetable-item-5.jpg" className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                  </div>
                </th>
                <td>
                  <p className="mb-0 mt-4">Potatoes</p>
                </td>
                <td>
                  <p className="mb-0 mt-4">2.99 $</p>
                </td>
                <td>
                  <div className="input-group quantity mt-4" style={{ width: 100 }}>
                    <div className="input-group-btn">
                      <button className="btn btn-sm btn-minus rounded-circle bg-light border">
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <input type="text" className="form-control form-control-sm text-center border-0" defaultValue={1} />
                    <div className="input-group-btn">
                      <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="mb-0 mt-4">2.99 $</p>
                </td>
                <td>
                  <button className="btn btn-md rounded-circle bg-light border mt-4">
                    <i className="fa fa-times text-danger" />
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <div className="d-flex align-items-center">
                    <img src="img/vegetable-item-2.jpg" className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                  </div>
                </th>
                <td>
                  <p className="mb-0 mt-4">Awesome Brocoli</p>
                </td>
                <td>
                  <p className="mb-0 mt-4">2.99 $</p>
                </td>
                <td>
                  <div className="input-group quantity mt-4" style={{ width: 100 }}>
                    <div className="input-group-btn">
                      <button className="btn btn-sm btn-minus rounded-circle bg-light border">
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <input type="text" className="form-control form-control-sm text-center border-0" defaultValue={1} />
                    <div className="input-group-btn">
                      <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="mb-0 mt-4">2.99 $</p>
                </td>
                <td>
                  <button className="btn btn-md rounded-circle bg-light border mt-4">
                    <i className="fa fa-times text-danger" />
                  </button>
                </td>
              </tr>
            </tbody> */}


          </table>
        </div>
        <div className="mt-5">
          <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code" />
          <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
        </div>
        <div className="row g-4 justify-content-end">
          <div className="col-8" />
          <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
            <div className="bg-light rounded">
              <div className="p-4">
                <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="mb-0 me-4">Subtotal:</h5>
                  <p className="mb-0">{total_price + '₹'}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <h5 className="mb-0 me-4">Shipping Cost</h5>
                  <div className>
                    <p className="mb-0">
                      {total_price >= 500 || total_price === 0 ? 'free Shipping'  : '99₹ Shipping Cost'}
                    </p>
                  </div>
                </div>
                <p className="mb-0 text-end">Shipping to Ukraine.</p>
              </div>
              <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                <h5 className="mb-0 ps-4 me-4">Total</h5>
                <p className="mb-0 pe-4">{total_price >= 500 || total_price === 0 ? total_price + '₹' : total_price + 99 + '₹'}</p>
              </div>
              <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
