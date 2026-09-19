import { useEffect, useState } from 'react'
import "./List.css"
import axios from "axios"
import { toast } from 'react-toastify';
const List = () => {
  const [list, setList] = useState([]);
  const url  = 'http://localhost:4000';
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if ( response.data.success) {
      setList(response.data.data);
      console.log(response.data);
    }else{
      toast.error(response.data.message);
    }
  }
  useEffect(()=>{
    fetchList();
  }, []);
  const removeFoodItem = async (id) => {
    const response = await axios.post(`${url}/api/food/remove`, {id});
    if ( response.data.success) {
      toast.success(response.data.message);
      fetchList();
    }else{
      toast.error(response.data.message);
    }
  }
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/`+ item.image} alt={item.name} />
              <p>{item.name}</p> 
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cursor" onClick= {() => removeFoodItem(item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
