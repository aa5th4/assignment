import React, { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import {useNavigate} from 'react-router-dom';
const Home = () => {
  const [users, setUsers] = useState([]);

  let limit = 15;

    useEffect(() => {
        const getUsers = async () => {
            const url=`https://api.thecatapi.com/v1/images/search?limit=${limit}&page=1`;
            const api_key = "live_cYCH1jlJrOuTE6Khpkghj8ikO0ckPVMfTor8KCSdtFeC7wCR2YIGN2RpaRmz8XeX"
            const res = await fetch(url,{headers: {
                'x-api-key': api_key
              }});
            const data = await res.json();
            setUsers(data);
            };
        getUsers();
    }, [limit]);


    const fetchData = async (currentPage) => {
        const url=`https://api.thecatapi.com/v1/images/search?limit=${limit}&_page=${currentPage}`;
        const api_key = "live_cYCH1jlJrOuTE6Khpkghj8ikO0ckPVMfTor8KCSdtFeC7wCR2YIGN2RpaRmz8XeX"
        const res = await fetch(url,{headers: {
            'x-api-key': api_key
          }});
        const data = await res.json();
        return data;
      };

    const handlePageClick = async (data) => {
        console.log(data.selected);
        let currentPage = data.selected + 1;
        const commentsFormServer = await fetchData(currentPage);

        setUsers(commentsFormServer);
    
        // scroll to the top
        //window.scrollTo(0, 0)
      };

      const navigate = useNavigate();
      const navigateToDetails = (id) => {
        navigate(`/about/${id}`);
      }

  return (
    <>
            <section id="header" class="jumbotron text-center md-8">
                <h1 class="display-3">FOREST</h1>
            </section>
            <div class="card-group ms-5" >
                    {
                        users.map((curElem) => {    
                            const { id,url} = curElem;
                            return (
                            <div class="col-sm-3 ms-5">
                                <div class="card" key={id} onClick={navigateToDetails(id)}>
                                    <div class="image">
                                    <img src={url} width="100%" height="300rem" />
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
            </div>

            <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={25}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  )
}

export default Home;