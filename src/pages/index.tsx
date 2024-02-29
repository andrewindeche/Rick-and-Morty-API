import React from 'react';
import LandingPage from '@/pages/LandingPage';
import Layout from 'components/Layout';
import pool from 'src/pages/api/db';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  data: any[];
}

const Home: React.FC = ( { data }) => {
  <ul>
        {data ? (
          data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    return (
      <Layout>
        <LandingPage/>
    </Layout>
    )
  };
  export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM your_table_name');
      return {
        props: { data: rows },
      };
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      return {
        props: { data: [] }, 
      };
    }
  };
  
  export default Home;
  