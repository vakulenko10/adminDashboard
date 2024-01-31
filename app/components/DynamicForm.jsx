import React, { useEffect, useState } from 'react';

const DynamicForm = ({ sectionName, initialData}) => {
  const [schema, setSchema] = useState([]);
  const [formData, setFormData] = useState({});
  // const [successMessage, setSuccessMessage] = useState('');
  console.log("initialData:", initialData)
  console.log("formData:", formData)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchContentFromDB/${sectionName}`);
        const data = await response.json();
        setSchema(data.modelProperties.filter(property => !['_id', 'createdAt', 'updatedAt', '__v'].includes(property)));

        if (initialData) {
          setFormData(initialData);
        }
      } catch (error) {
        console.error('Error fetching schema:', error);
      }
    };

    fetchData();
  }, [sectionName, initialData]);
  console.log("schema:", schema)
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
      const response = await fetch(`/api/fetchContentFromDB/${sectionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({});
        window.location.href = `/section/${sectionName}`;
        setSuccessMessage('Item created successfully');
        
      } else {
        console.error('Failed to create item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <>
      {/* {successMessage && <div style={{ color: 'green', background: 'yellow' }}>{successMessage}</div>} */}
      <form onSubmit={handleSubmit}>
        {schema.map((property) => (
          <div key={property}>
            <label htmlFor={property}>{property}</label>
            <input
              type="text"
              id={property}
              name={property}
              value={formData[property] || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        ))}
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default DynamicForm;