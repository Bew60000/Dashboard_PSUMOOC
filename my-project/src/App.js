import logo from './img/psumooc-logoDashboard-White.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Icon, Dropdown, Input } from 'semantic-ui-react';

import LoadingPage from './LoadingPage';
import UserBarChart from './chart';
import Category from './Category';

function App() {

  const [data, setData] = useState("");
  const [data2, setData2] = useState([]);

  // button sort data Total Students
  const [sortConfig, setSortConfig] = useState({ key: 'totalStudents', direction: 'ascending' });
  const [sortCer, setSortCer] = useState({ key: 'totalCert', direction: 'ascending' });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // API course, category, totalStudents, totalCer
    axios.get('https://script.google.com/macros/s/AKfycbzzHlr-1FsMj0kZSda45pZlNWHHVg5apV9L6lvQKhvVsAMfj1i5NAugOxGXK72rc_c5/exec')
      .then(res => setData(res.data))
    // console.log(data); 

    // API total_Learners, total_Cert_By_All_Subject ,total_User_By_All_Subject
    axios.get('https://script.google.com/macros/s/AKfycbx1KcGPCfD4AOUnyW45Ihf7knL6bL-2PZ1xIeo4ig12mmHT_7DnQNb8Epy4kAaCNu-E/exec?type=total')
      .then(res => setData2(res.data))
    // console.log(data2);
  }, []);

  // Loading fech data
  if (!data) {
    return <LoadingPage />
  }

  // filter category and search course
  const filteredData = data.filter(item => {
    return (
      (selectedCategory ? item.category_Name === selectedCategory : true) &&
      (searchTerm ? item.course_Name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
  });

  //fucntion sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    if (sortCer.key === key && sortCer.direction === 'ascending') {
      direction = 'descending';
    }
    setSortCer({ key, direction });
  };

  // Page 
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };
  //---

  const categories = Array.from(new Set(data.map(item => item.category_Name))).map(category => ({
    key: category,
    text: category,
    value: category
  }));

  return (

    <div className="flex w-full h-full bg-gradient-to-br from-slate-900 to-blue-700 font-sans">

      <div className='container mx-auto'>

        <div className='grid justify-items-center auto-rows-auto my-0 text-center'>
          <img src={logo} className='scale-50 ' />
        </div>



        <div className='grid grid-cols-3 auto-rows-[100px] gap-4 my-4'>
          <div className='bg-white rounded-md border-2 text-center flex flex-col item-center justify-center'>
            <h2 className='text-xl text-gray-600 m-0'>จำนวนผู้เรียนในระบบ</h2>
            {data2.map(val =>
              <p className='text-3xl font-bold text-gray-600'>{val.total_Learners} คน</p>
            )}
          </div>

          <div className='bg-white rounded-md border-2 text-center flex flex-col item-center justify-center'>
            <h2 className='text-xl text-gray-600 m-0'>Certificate ที่รับรองแล้ว</h2>
            {data2.map(val =>
              <p className='text-3xl font-bold text-gray-600'>{val.total_Cert_By_All_Subject} ใบ</p>
            )}
          </div>

          <div className='bg-white rounded-md border-2 text-center flex flex-col item-center justify-center '>
            <h2 className='text-xl text-gray-600 m-0'>จำนวนการลงทะเบียนเรียน</h2>
            {data2.map(val =>
              <p className='text-3xl font-bold text-gray-600'>{val.total_User_By_All_Subject} ครั้ง</p>
            )}
          </div>

        </div>

        <div className='grid grid-cols-3 gap-4 auto-rows-auto mb-4 '>
          <div className='bg-white border-2 col-span-2 rounded-md text-center'>
            <UserBarChart />
          </div>

          <div className='bg-white rounded-md text-center p-5'>
            <h2 className='text-xl text-gray-600 m-1'>หมวดหมู่ที่เปิดสอน</h2>
            <Category />
          </div>

        </div>

        <div className='bg-white p-10 rounded-md text-center auto-rows-auto mb-10'>
          <div className='grid grid-cols-6 gap-4 mb-4'>
            <div>
              <Dropdown
                placeholder='Select Category'
                selection
                options={categories}
                onChange={(e, { value }) => setSelectedCategory(value)}
                value={selectedCategory}
                clearable
              />

            </div>

            <div>
              <Input
                icon='search'
                placeholder='Search by course name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <h2 className='text-xl text-gray-600 m-1'>จำนวนผู้ลงทะเบียนเรียนในแต่ละรายวิชา</h2>
          <Table>
            <Table.Header className='text-gray-600'>

              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell onClick={() => handleSort('totalStudents')}>
                Total Students <Icon name={sortConfig.direction === 'ascending' ? 'sort up' : 'sort down'} />
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => handleSort('totalCert')}>
                Certificate <Icon name={sortCer.direction === 'ascending' ? 'sort up' : 'sort down'} />
              </Table.HeaderCell>
            </Table.Header>

            <Table.Body>
              {currentItems.map(val =>
                <Table.Row>
                  <Table.Cell>{val.course_Name}</Table.Cell>
                  <Table.Cell>{val.category_Name}</Table.Cell>
                  <Table.Cell>{val.totalStudents} คน</Table.Cell>
                  <Table.Cell>{val.totalCert} ใบ</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>

          <Pagination
            activePage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>



      </div>

    </div >


  );
}

export default App;
