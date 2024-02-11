import React, { useEffect, useState } from 'react';

const DynamicForm = ({ sectionName, initialData }) => {
  const [schema, setSchema] = useState([]);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  //here I can try to pass in the full info about current item so that I don't need to fetch the data from the db again
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
  <div
        className="dynamicForm max-w-md mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
      >
      <h2 className="text-2xl text-sky-900 font-bold mb-6">Update item from {sectionName} section </h2>

      <form onSubmit={handleSubmit} >
        <div className="mb-4">
        {schema.map((property) => (
          <div key={property} className='schema_item'>
            <label htmlFor={property} className='block text-sm font-medium text-gray-600'>{property}</label>
            <textarea
              type="text"
              rows="4"
              id={property}
              name={property}
              value={formData[property] || ''}
              onChange={handleInputChange}
              required
              className='text-area mt-1 p-2 w-full border rounded-md resize-none'
            ></textarea>
          </div>
          
        ))}
        {initialData?.imageURL?<img style={{width: "100px"}} src={initialData.imageURL} />:<>nothing</>}
        <button type="submit" className="flex justify-center items-center text-center w-full [background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80">{initialData ? 'Update' : 'Create'}</button>
          
      </div>
    </form>
  </div>
  );

};

export default DynamicForm;
