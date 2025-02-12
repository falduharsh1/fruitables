import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { getproduct } from '../../redux/Slice/ProductSlice';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';


export default function Shop() {

  const { id } = useParams()
  console.log(id);

  const dispatch = useDispatch()

  const CatgorySelector = useSelector((state => state.Category))
  console.log(CatgorySelector)

  const productselector = useSelector((state => state.product));
  console.log(productselector);

  useEffect(() => {
    dispatch(getproduct())
  }, [])

  const gg = productselector?.product?.filter((v) => id === v.subcategory)
  console.log(gg);

  const category_name = CatgorySelector?.Category?.find(
    (v) => v._id === productselector?.product[0]?.category)

  console.log(category_name);

  const [price, setPrice] = React.useState(0);
  const [sort, setsort] = useState("");
  const [search, setsearch] = useState("");
  const [fruitData, setFruitData] = useState("");
  const [priceData, setPriceData] = useState([]);

  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  const HandleFiltering = () => {
    console.log(search);
    let F_data = [];

    // setdatas(data);

    console.log(id);

    F_data = productselector?.product?.filter(
      (v, i) =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.price.toString().includes(search.toString()) ||
        v.description.toLowerCase().includes(search.toLowerCase())
    );

    console.log(F_data)

    if (id) {
      F_data = [...F_data?.filter((v) => id === v.subcategory)]
    } else {
      F_data = [...F_data]
    }

    if (sort === "l-h") {
      F_data = F_data.sort((a, b) => a.price - b.price);
    } else if (sort === "h-l") {
      F_data = F_data.sort((a, b) => b.price - a.price);
    } else if (sort === "a-z") {
      F_data = F_data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "z-a") {
      F_data = F_data.sort((a, b) => b.name.localeCompare(a.name));
    }

    console.log(fruitData);

    if (fruitData) {
      F_data = F_data.filter((v) => v.category === fruitData._id);
    }

    console.log(F_data);

    if (price > 0) {
      F_data = F_data?.filter((v) => (
        v.price <= price
      ))
    }
    return F_data;

  };

  console.log();

  const Final_Data = HandleFiltering();
  console.log(Final_Data);

  return (
    <div className="container-fluid fruite py-5">

      <div className="container py-5">
        <h1 className="mb-4">Fresh fruits shop</h1>
        <div className="row g-4">
          <div className="col-lg-12">
            <div className="row g-4">
              <div className="col-xl-3">
                <div className="input-group w-100 mx-auto d-flex">
                  <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" onChange={(e) => setsearch(e.target.value)} />
                  <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                </div>
              </div>
              <div className="col-6" />
              <div className="col-xl-3">
                <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                  <label htmlFor="fruits">Default Sorting:</label>
                  <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform" onChange={(e) => setsort(e.target.value)}>
                    <option value="volvo">Nothing</option>
                    <option value="l-h">Low To High</option>
                    <option value="h-l">High To Low</option>
                    <option value="a-z">A To Z</option>
                    <option value="z-a">Z To A</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-3">
                <div className="row g-4">


                  <div className="col-lg-12">
                    <div className="mb-3">
                      <h4 >Categories</h4>
                      <br></br>
                      <div onClick={() => { setFruitData('') }} style={{ marginLeft: '1.5px' }}>
                        <a href="#" ><i className="fas fa-apple-alt me-2" />All</a>
                      </div>
                      <br></br>

                      {
                        CatgorySelector.Category.map((v) => (
                          <ul className="list-unstyled fruite-categorie">
                            <li>
                              <div className="d-flex justify-content-between fruite-name"
                                onClick={() => { setFruitData(v) }}>
                                <a href="#" ><i className="fas fa-apple-alt me-2" />{v.name}</a>
                                {
                                  productselector.product.filter((c) =>
                                    c.category === v._id
                                  )?.length
                                }

                              </div>
                            </li>
                          </ul>
                        ))
                      }

                      {/* <ul className="list-unstyled fruite-categorie">
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#"><i className="fas fa-apple-alt me-2" />Apples</a>
                              <span>(3)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#"><i className="fas fa-apple-alt me-2" />Oranges</a>
                              <span>(5)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#"><i className="fas fa-apple-alt me-2" />Strawbery</a>
                              <span>(2)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#"><i className="fas fa-apple-alt me-2" />Banana</a>
                              <span>(8)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#"><i className="fas fa-apple-alt me-2" />Pumpkin</a>
                              <span>(5)</span>
                            </div>
                          </li>
                        </ul> */}
                    </div>
                  </div>

                  <Box sx={{ width: 300, p: 2 }}>
                    <Typography variant="h6">Price: ₹{price}</Typography>
                    <Slider
                      // style={{color : green}}
                      value={price}
                      onChange={handleChange}
                      min={0}
                      max={1000}
                      step={10}
                      valueLabelDisplay="auto"
                      aria-label="Price Slider"
                    />
                  </Box>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <h4>Additional</h4>
                      <div className="mb-2">
                        <input type="radio" className="me-2" id="Categories-1" name="Categories-1" defaultValue="Beverages" />
                        <label htmlFor="Categories-1"> Organic</label>
                      </div>
                      <div className="mb-2">
                        <input type="radio" className="me-2" id="Categories-2" name="Categories-1" defaultValue="Beverages" />
                        <label htmlFor="Categories-2"> Fresh</label>
                      </div>
                      <div className="mb-2">
                        <input type="radio" className="me-2" id="Categories-3" name="Categories-1" defaultValue="Beverages" />
                        <label htmlFor="Categories-3"> Sales</label>
                      </div>
                      <div className="mb-2">
                        <input type="radio" className="me-2" id="Categories-4" name="Categories-1" defaultValue="Beverages" />
                        <label htmlFor="Categories-4"> Discount</label>
                      </div>
                      <div className="mb-2">
                        <input type="radio" className="me-2" id="Categories-5" name="Categories-1" defaultValue="Beverages" />
                        <label htmlFor="Categories-5"> Expired</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <h4 className="mb-3">Featured products</h4>
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                        <img src="img/featur-1.jpg" className="img-fluid rounded" alt />
                      </div>
                      <div>
                        <h6 className="mb-2">Big Banana</h6>
                        <div className="d-flex mb-2">
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star" />
                        </div>
                        <div className="d-flex mb-2">
                          <h5 className="fw-bold me-2">2.99 $</h5>
                          <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                        <img src="img/featur-2.jpg" className="img-fluid rounded" alt />
                      </div>
                      <div>
                        <h6 className="mb-2">Big Banana</h6>
                        <div className="d-flex mb-2">
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star" />
                        </div>
                        <div className="d-flex mb-2">
                          <h5 className="fw-bold me-2">2.99 $</h5>
                          <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                        <img src="img/featur-3.jpg" className="img-fluid rounded" alt />
                      </div>
                      <div>
                        <h6 className="mb-2">Big Banana</h6>
                        <div className="d-flex mb-2">
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star text-secondary" />
                          <i className="fa fa-star" />
                        </div>
                        <div className="d-flex mb-2">
                          <h5 className="fw-bold me-2">2.99 $</h5>
                          <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center my-4">
                      <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</a>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="position-relative">
                      <img src="img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt />
                      <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                        <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-lg-9">
                <div className="row g-4 justify-content-center">
                  {
                    Final_Data.map((v, i) => (
                      <div className="col-md-6 col-lg-6 col-xl-4">
                          <NavLink to={"/ShopDetail/" + v._id}>
                            <div className="rounded position-relative fruite-item">

                              <div className="fruite-img">
                                <img src={'http://localhost:4000/' + v.product_img} className="img-fluid w-100 rounded-top" alt style={{ height: '280px' }} />
                              </div>

                              <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }} >
                                <p style={{ marginBottom: '0px' }}>
                                  {
                                    CatgorySelector.Category?.find(
                                      (c) => c._id === v.category
                                    )?.name
                                  }
                                </p>
                              </div>
                              <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h4 key={v._id} value={v._id}> {v.name}</h4>
                                <p>{v.description}</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                  <p className="text-dark fs-5 fw-bold mb-0">{v.price + ' ₹/kg'}</p>
                                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                              </div>

                            </div>
                          </NavLink>
                        </div>
                    ))
                  }



                  {/* <div className="fruite-img">
                      <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: 10, left: 10}}>Fruits</div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                      <h4>Grapes</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                        <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                      </div>
                    </div> */}

                  {/* <div className="col-md-6 col-lg-6 col-xl-4">
                  <div className="rounded position-relative fruite-item">
                    <div className="fruite-img">
                      <img src="img/fruite-item-2.jpg" className="img-fluid w-100 rounded-top" alt />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: 10, left: 10}}>Fruits</div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                      <h4>Raspberries</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                        <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-4">
                  <div className="rounded position-relative fruite-item">
                    <div className="fruite-img">
                      <img src="img/fruite-item-4.jpg" className="img-fluid w-100 rounded-top" alt />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: 10, left: 10}}>Fruits</div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                      <h4>Apricots</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                        <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-4">
                  <div className="rounded position-relative fruite-item">
                    <div className="fruite-img">
                      <img src="img/fruite-item-3.jpg" className="img-fluid w-100 rounded-top" alt />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: 10, left: 10}}>Fruits</div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                      <h4>Banana</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                        <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-4">
                  <div className="rounded position-relative fruite-item">
                    <div className="fruite-img">
                      <img src="img/fruite-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: 10, left: 10}}>Fruits</div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                      <h4>Oranges</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                        <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-4">
                  <div className="rounded position-relative fruite-item">
                    <div className="fruite-img">
                      <img src="img/fruite-item-2.jpg" className="img-fluid w-100 rounded-top" alt />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: 10, left: 10}}>Fruits</div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                      <h4>Raspberries</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                        <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-4">
                  <div className="rounded position-relative fruite-item">
                    <div className="fruite-img">
                      <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: 10, left: 10}}>Fruits</div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                      <h4>Grapes</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                        <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-4">
                  <div className="rounded position-relative fruite-item">
                    <div className="fruite-img">
                      <img src="img/fruite-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: 10, left: 10}}>Fruits</div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                      <h4>Oranges</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                        <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div> */}
                  <div className="col-12">
                    <div className="pagination d-flex justify-content-center mt-5">
                      <a href="#" className="rounded">«</a>
                      <a href="#" className="active rounded">1</a>
                      <a href="#" className="rounded">2</a>
                      <a href="#" className="rounded">3</a>
                      <a href="#" className="rounded">4</a>
                      <a href="#" className="rounded">5</a>
                      <a href="#" className="rounded">6</a>
                      <a href="#" className="rounded">»</a>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
