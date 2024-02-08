import React, { useEffect, useState } from 'react';
import '../styles/dynamicform.scss'

const DynamicForm = ({ sectionName, initialData }) => {
  const [schema, setSchema] = useState([]);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  // const [itemImageURL, setItemImageURL] = useState(initialData.imageURL)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchContentFromDB/${sectionName}`);
        const data = await response.json();
        setSchema(data.modelProperties.filter(property => !['_id', 'createdAt', 'updatedAt', '__v'].includes(property)));
        
        if (initialData) {
          setFormData(initialData);
          console.log('formData:', formData)
        }
      } catch (error) {
        console.error('Error fetching schema:', error);
      }
    };

    fetchData();
  }, [sectionName, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = initialData
        ? `/api/fetchContentFromDB/${sectionName}/${initialData._id}`
        : `/api/fetchContentFromDB/${sectionName}`;

      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({});
        setSuccessMessage(initialData ? 'Item updated successfully' : 'Item created successfully');
        setTimeout(() => {
          setSuccessMessage(null);
          window.location.href = `/section/${sectionName}`;
        }, 5000);
      } else {
        initialData?console.error('Failed to update item'):console.error('Failed to create item');
      }
    } catch (error) {
      initialData?console.error('Error updating item:', error):console.error('Error creating item:', error);
    }
  };

  return (
    <>
      {/* {successMessage && <div style={{ color: 'green', background: 'yellow' }}>{successMessage}</div>} */}
      <form onSubmit={handleSubmit}>
        {schema.map((property) => (
          <div key={property} className='schema_item'>
            <label htmlFor={property} className='title'>{property}</label>
            <textarea
              type="text"
              id={property}
              name={property}
              value={formData[property] || ''}
              onChange={handleInputChange}
              required
              className='text-area'
            ></textarea>
          </div>
          
        ))}
        {initialData?.imageURL?<img style={{width: "100px"}} src={initialData.imageURL} />:<>nothing</>}
        <button type="submit">{initialData ? 'Update' : 'Create'}</button>
      </form>
    </>
  );
};

export default DynamicForm;
