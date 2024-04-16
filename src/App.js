import logo from './logo.svg';
import './App.css';
import './index.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true when starting fetch
      const response = await axios.get('https://randomuser.me/api/?page=1&results=1&seed=abc');
      const data = response.data;
      setUserData(data.results[0]);
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };


  const handleClickAddress = () => {
    if (userData && userData.location && userData.location.coordinates) {
      const { latitude, longitude } = userData.location.coordinates;
      // Redirect to map using the coordinates
      window.location.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
      {loading ? ( // Render loader if loading is true
        <div className="text-white">Loading...</div>
      ) :
        <div className="flex rounded-lg shadow-xl dark:bg-neutral-100 text-center p-8 max-w-lg items-center cursor-pointer " onClick={handleClickAddress}>
          {/* Left side (photo) */}
          <div className="flex-shrink-0 mr-8 ">
            <img className="rounded-lg w-40 h-40 bg-cover" src={userData?.picture.large} alt="Profile Photo" />
          </div>

          <div className="text-left text-slate-800 ">
            {/* Name */}
            <div className="">
              <span className="text-2xl font-bold text-justify "> {userData?.name?.first} </span>
              <span className="text-2xl font-bold">{userData?.name?.last} </span>
            </div>

            {/* Gender */}
            <div className="">
              <p className="text-base font-medium">Gender: {userData.gender}</p>
            </div>

            {/* Phone Number */}
            <div className="">
              <p className="text-base font-medium">Phone: <span className='text-blue-500'>{userData.phone}</span> </p>
            </div>
            {/*city*/}
            <div className=" font-medium ">
              <p className="text-base ">city: {userData.location.city}</p>
            </div>

            <div className="mb-1 flex-row font-medium  ">
              <div className="text-base ">email: <span className='text-blue-500'>{userData.email}</span> </div>
              <div className="text-base ">location: {userData?.location?.street?.name} <span>{userData?.location?.street?.number}</span> </div>

            </div>
          </div>
        </div>}
    </div>
  );
}

export default App;
