import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getsubcat } from '../../redux/Slice/SubCatSlice';
import { NavLink, useParams } from 'react-router-dom';

export default function SubCategory() {

    const dispatch = useDispatch()

    const SubCatgoryy = useSelector((state => state.subCat));
    console.log(SubCatgoryy);

    const {id} = useParams()
    console.log(id);
    
    const DataGet = () => {
        dispatch(getsubcat())
    }

    useEffect(() => {
        DataGet()
    }, [])

    return (
        <>

            {
                <div style={{ marginTop : '100px'}}>
                <div className="container-fluid service py-5">
                <div className="container py-5">
                    <div className="row g-4 justify-content-center">

                        {
                            SubCatgoryy?.subCat?.filter((v) => id === v.category).map((v, i) => (
                                <div className="col-md-6 col-lg-4">
                                    <NavLink to={"/Shop/" + v._id}>
                                    <div className="service-item bg-secondary rounded border border-secondary">
                                        <img src={'http://localhost:4000/' + v.subCat_img} className="img-fluid rounded-top w-100" alt style={{ height: '350px', objectFit: 'cover'}}/>
                                        <div className="px-4 rounded-bottom">
                                            <div className="service-content bg-primary text-center p-4 rounded">
                                                <h2 key={v._id} value={v._id}>
                                                    {v.name}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    </NavLink>
                                </div>

                            ))}
                    </div>
                </div>
            </div>
            </div>
            }

            {/* <div style={{ marginTop : '100px'}}>
            <div className="container-fluid service py-5">
                <div className="container py-5">
                    <div className="row g-4 justify-content-center">
                        {SubCatgoryy?.subCat?.map((v, i) => (
                            <div className="col-md-6 col-lg-4" key={v._id}>
                                <div className="service-item bg-secondary rounded border border-secondary" style={{ height: '390px' }}>
                                    <img
                                        src={`http://localhost:4000/${v.subCat_img}`}
                                        className="img-fluid rounded-top w-100"
                                        alt={v.name}
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                    <div className="px-4 rounded-bottom">
                                        <div className="service-content bg-primary text-center p-4 rounded">
                                            <h2>{v.name}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </div> */}


        </>
    )
}
