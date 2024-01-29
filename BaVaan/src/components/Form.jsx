import { motion } from 'framer-motion'
import { fadeIn } from '../../variants';
import { BsArrowRight } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {

    // Declare variable
    const phoneRegex = /^\d+$/;
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        city: '',
        district: '',
    })
    const [cityChoose, setCity] = useState('')
    const [districtChoose, setDistrict] = useState('')
    const [cityName, setCityName] = useState([]);
    const [districtName, setDistrictName] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [error, setError] = useState({
        phone: '',
        email: '',
        city: '',
        district: '',
    });

    // fetch data
    const fetchCities = async () => {
        try {
            const response = await axios.get('https://vapi.vnappmob.com/api/province/');
            console.log(response);
            setCityName(response.data.results)
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };
    const fetchDistricts = async () => {
        if (selectedCity) {
            try {
                const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedCity}`);
                setDistrictName(response.data.results)
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        }
    };

    // function 
    const updateCityAndDistrictNames = () => {
        const cityName1 = cityName.find(item => item.province_id === selectedCity);
        const districtName1 = districtName.find(item => item.district_id === selectedDistrict);
        setCity(cityName1?.province_name || "");
        setDistrict(districtName1?.district_name || "");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newError = { ...error };
        if (!formData.phone || !phoneRegex.test(formData.phone)) {
            newError.phone = 'Số điện thoại của bạn không đúng.Vui lòng nhập số điện thoại hợp lệ.';
        } else {
            newError.phone = '';
        }

        if (!formData.email || !formData.email.endsWith('@gmail.com')) {
            newError.email = 'Vui lòng nhập địa chỉ email hợp lệ (phải kết thúc bằng @gmail.com).';
        } else {
            newError.email = '';
        }

        if (!selectedCity || !selectedDistrict) {
            newError.city = 'Vui lòng chọn đầy đủ Tỉnh/Thành phố và Quận/Huyện.';
        } else {
            newError.city = '';
        }
        setError(newError);

        if (!newError.phone && !newError.email && !newError.city && !newError.district) {
            setFormData((prevData) => ({
                ...prevData,
                district: districtChoose,
                city: cityChoose
            }));
        }
    };

    // useEffect
    useEffect(() => {
        fetchCities();
    }, []);

    useEffect(() => {
        fetchDistricts();
    }, [selectedCity]);
    useEffect(() => {
        updateCityAndDistrictNames();
    }, [selectedCity, selectedDistrict]);
    useEffect(() => {
        console.log('Form Data:', formData);
    }, [formData]);
    return (
        <div className='flex flex-col w-full items-center justify-center mt-2'>
            <div className='h3 text-red-300'>Thông tin của bạn</div>
            <motion.form
                variants={fadeIn('up', 0.6)}
                initial='hidden'
                animate='show'
                exit='hidden'
                onSubmit={handleSubmit}
                className='flex flex-col w-full items-center justify-center'
                action="">
                <div className='flex w-full flex-col items-center justify-center mb-4'>
                    <div className='flex w-[700px] flex-1 items-center justify-center'>
                        <label className='text-[20px] w-[200px] text-white font-semibold'>Số điện thoại:</label>
                        <input
                            type="text"
                            name='phone'
                            className='input'
                            onChange={handleInputChange}
                            placeholder='Nhập số điện thoại của bạn' />
                    </div>


                    {error.phone && <div className='text-red-500 mt-2'>{error.phone}</div>}
                </div>

                <div className='flex w-full flex-col items-center justify-center mb-4'>
                    <div className='flex w-[700px] flex-1 items-center justify-center'>
                        <label className='text-[20px] w-[200px] text-white font-semibold'>Địa chỉ email:</label>
                        <input
                            type="text"
                            name='email'
                            className='input'
                            onChange={handleInputChange}
                            placeholder='Nhập địa chỉ email của bạn' />
                    </div>
                    {error.email && <div className='text-red-500 mt-2'>{error.email}</div>}
                </div>

                <div className='flex w-full flex-col items-center justify-center mb-4'>
                    <div className='flex w-[700px] flex-1 items-center justify-center'>
                        <label className='text-[20px] w-[200px] text-white font-semibold'>Tỉnh/Thành phố:</label>
                        <select
                            onChange={(e) => setSelectedCity(e.target.value)}
                            value={selectedCity}
                            name="city"
                            className='input'
                            id="">
                            <option value="" selected disabled hidden>Chọn Tỉnh/Thành phố</option>
                            {cityName.map((city) => {
                                return (
                                    <option
                                        value={city.province_id}
                                        key={city.province_id}
                                    >
                                        {city.province_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {error.city && <div className='text-red-500 mt-2'>{error.city}</div>}
                </div>

                <div className='flex w-full flex-col items-center justify-center mb-4'>
                    <div className='flex w-[700px] flex-1 items-center justify-center'>
                        <label className='text-[20px] w-[200px] text-white font-semibold'>Quận/Huyện:</label>
                        <select
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            value={selectedDistrict}
                            name="district"
                            className='input'
                            id="">
                            <option value="" selected disabled hidden>Chọn Quận/Huyện</option>
                            {districtName.map((district) => {
                                return (
                                    <option
                                        value={district.district_id}
                                        key={district.district_id}
                                    >
                                        {district.district_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {error.district && <div className='text-red-500 mt-2'>{error.district}</div>}
                </div>

                <button className='btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-red-300 group'>
                    <span className='group-hover:-translate-y-[120%] text-white group-hover:opacity-0 transition-all duration-500'>
                        Submit
                    </span>
                    <BsArrowRight className=' -translate-y-[120%] text-white opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-100 absolute text-[22px]' />
                </button>
            </motion.form>

            {formData.city && formData.district && (
                <div>
                    <div className='h3 text-red-300'>Cảm ơn anh/chị, dưới đây sẽ là thông tin của anh chị:</div>
                    {Object.keys(formData).map((key, index) => (
                        <div key={index} className='flex flex-col'>
                            <div className='text-[20px] text-white'>{`${key}: ${formData[key]}`}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Form
