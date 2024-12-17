import React from "react";

export default function LocationImageList({ isMobile ,city}) {

   
    return (
        <>
            <div key={city?.name} style={{ marginBottom: '48px' }}>
                <div className="d-flex justify-content-between">
                    {
                        !isMobile ?
                        
                            <div id={`carouselExampleControls${city?.name?.replace(/[\s,]/g, "")}`} className="w-100 carousel slide d-flex " data-bs-ride="carousel" data-bs-touch="true">
                                <div className="carousel-inner custom-carousel-inner">
                                    {city?.image?.map((img, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <div className="d-flex align-items-end">
                                                <img src={img} className="special-img" alt="Tourist on Boat"    
                                                />
                                                <img src={city?.image[(index + 1) % 10]} className="normal-img mr-16" alt="Tourist on Boat"      
                                                />
                                                <img src={city?.image[(index + 2) % 10]} className="normal-img" alt="Tourist on Boat"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControls${city?.name.replace(/[\s,]/g, "")}`} data-bs-slide="prev" style={{ right: '0%' }}>
                                            <img src="img/next-icon.svg" alt="Previous" className='controll-icon'/>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControls${city?.name.replace(/[\s,]/g, "")}`} data-bs-slide="next">
                                            <img src="img/previous-icon.svg" alt="Next" className='controll-icon' />
                                        </button>
                                    </div>
                                </div>
                            </div>         
                            : 
                            <div id={`carouselExampleControlsMobile${city?.name?.replace(/[\s,]/g, "")}`} className=" w-100 carousel slide d-flex" data-bs-ride="carousel" data-bs-touch="true">
                                <div className="carousel-inner custom-carousel-inner">
                                    {city?.image?.map((img, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <div className="d-flex align-items-end">
                                                <img src={img} className="normal-img me-2" alt="Phú Quốc Island"        
                                                />
                                                <img src={city.image[(index + 1) % 10]} className="normal-img" alt="Tourist on Boat" 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControlsMobile${city?.name.replace(/[\s,]/g, "")}`} data-bs-slide="prev">
                                            <img src="img/next-icon.svg" alt="Previous" className='carousel-control-prev-icon'/>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControlsMobile${city?.name.replace(/[\s,]/g, "")}`} data-bs-slide="next">
                                            <img src="img/previous-icon.svg" alt="Next" className='carousel-control-next-icon'  />
                                        </button>
                                    </div>
                                </div>
                            </div>    
                    }
                </div>
                <p className="desktop-regular-20 col-12 col-sm-8" style={{ marginTop: '48px' }}>{city?.description}</p>
            </div>
        </>
    )
}