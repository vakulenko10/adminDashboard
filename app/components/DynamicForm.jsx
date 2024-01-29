import React, { useEffect, useState } from 'react';

const DynamicForm = ({ sectionName }) => {
  const [schema, setSchema] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchContentFromDB/${sectionName}`);
        const data = await response.json();
        setSchema(data.modelProperties.filter(property => !['_id', 'createdAt', 'updatedAt', '__v'].includes(property)));
      } catch (error) {
        console.error('Error fetching schema:', error);
      }
    };

    fetchData();
  }, [sectionName]);

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
        console.log('Item created successfully');
        // Optionally, you can redirect or perform other actions upon successful creation.
      } else {
        console.error('Failed to create item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
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
          />
        </div>
      ))}
      <button type="submit">Create Item</button>
    </form>
  );
};

export default DynamicForm;