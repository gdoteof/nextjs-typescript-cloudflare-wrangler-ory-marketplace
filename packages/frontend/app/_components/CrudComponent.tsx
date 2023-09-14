'use client'

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import validator from '@rjsf/validator-ajv8';
import dynamic from 'next/dynamic';

import Form from '@rjsf/core';
// import AutoComplete from 'react-google-autocomplete';
const AutoComplete = dynamic(() => import('react-google-autocomplete'), {
  ssr: false,
});

type Props = {
  schema: any;
  name: string;
};

const GOOGLE_MAPS_API_KEY=process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
};

const CrudComponent: React.FC<Props> = ({ schema, name }) => {
  const baseUrl = process.env.NEXT_PUBLIC_THRIV_API;
  const { data, error } = useSWR(`${baseUrl}/api/${name}`, fetchData);

  const [editing, setEditing] = useState<any | null>(null);

  const handleEdit = (item: any) => setEditing(item);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${baseUrl}/api/${name}/${id}`, { method: 'DELETE' });
      mutate(`${baseUrl}/api/${name}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async ({ formData }: any) => {
    try {
      await fetch(`${baseUrl}/api/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      mutate(`${baseUrl}/api/${name}`);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(GOOGLE_MAPS_API_KEY);
  return (
        <>
        <AutoComplete
          apiKey={GOOGLE_MAPS_API_KEY}
          options={{ types: [] }}
          onPlaceSelected={(place) => console.log(place)}
          style={{ width: '100%' }}
        />
      <Form
        schema={schema}
        onSubmit={handleFormSubmit}
        validator={validator}
        // Assuming the form uses Chakra UI components, you can style it here
      />
      <>
      {data &&
        data.map((item: any) => (
            <div>{item.id} {item.name}</div>
        ))}
      </>
      </>
  );
};

export default CrudComponent;
