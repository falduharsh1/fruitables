export const BASE_URL = 'http://localhost:4000/api/v1'


// function Shop() {
//     const dispatch = useDispatch();
  
//     const productData = useSelector((state) => state.Product);
  
//     console.log("productData", productData);
  
//     const categoryData = useSelector((state) => state.Category);
  
//     console.log("categoryData", categoryData);
  
//     const getData = () => {
//       dispatch(getProduct());
//       dispatch(getCategores());
//     };
  
//     useEffect(() => {
//       getData();
//     }, []);
  
//     const { id } = useParams();
//     // console.log(id);
  
//     // const findProduct = productData.Product.filter((v) => v.SubCategory == id)
  
//     // console.log(findProduct);
//     const CategoryData = categoryData.Category.find(
//       (c) => c._id === productData.Product[0].Category
//     );
  
//     console.log(CategoryData);



// {productData.Product?.filter((v) => v.SubCategory == id)?.map(
//     (v) => {
//       return (
//         <div className="col-md-6 col-lg-6 col-xl-4">
//           <div className="rounded position-relative fruite-item">
//             <div className="fruite-img">
//               <img
//                 src={"http://localhost:8000/" + v.product_img}
//                 className="img-fluid w-100 rounded-top"
//                 alt
//                 style={{ height: "350px", objectFit: "cover" }}
//               />
//             </div>
//             <div
//               className="text-white bg-secondary px-3 py-1 rounded position-absolute"
//               style={{ top: 10, left: 10 }}
//             >
//               <p style={{ height: "10px" }}>
//                 {
//                   categoryData.Category?.find(
//                     (c) => c._id === v.Category
//                   )?.name
//                 }
//               </p>
//             </div>
//             <div className="p-4 border border-secondary border-top-0 rounded-bottom">
//               <h4>{v.name}</h4>
//               <p>{v.description.slice(0, 60)}...</p>
//               <div className="d-flex justify-content-between flex-lg-wrap">
//                 <p className="text-dark fs-5 fw-bold mb-0">
//                   {v.price}
//                 </p>
//                 <NavLink to={"/Shop/5"}>
//                   <a
//                     href="#"
//                     className="btn border border-secondary rounded-pill px-3 text-primary"
//                   >
//                     <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
//                     Add to cart
//                   </a>
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }
//               )}