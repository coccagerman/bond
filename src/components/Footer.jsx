
function Footer ({handleSearchAgain}) {
    return (
    <footer>
            <div className="company_identity" onClick={(e) => handleSearchAgain(e)}>
                <img alt="Company logo" className="footer_logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDYxMiA2MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPHBhdGggZD0iTTYxMiwxOTUuNzIyYzAsMTA1Ljg3LTUxMC4zNzQsMjIyLjcyNy01NDkuMDIsMjIyLjcyN2MtMjEuNjY3LDAtNDYuMjUtNC45OTQtNDYuMjUtMjQuOTY5ICAgYzAtNi42NzQsNy43MDMtMTYuMzIsMjEuMjItMjcuOTQ5bC0wLjAxNSwwLjAwOEwyLjEwOSwzMDEuODgzYy00Ljg1MS04LjYxOC0xLjAwNS0xOS41MzYsOC4xNzUtMjMuMjEybDYuMTU3LTIuNDY1ICAgYzExLjE1OS00LjQ2OCwyMy43MTgtMy44MDIsMzQuMzQxLDEuODIxbDY1LjAzOSwzNC40MzJjMjUuMzIzLTE1LjAyLDU0LjA0OS0zMC43NDYsODQuMzI2LTQ2LjIyOUw3My40MDIsMTg0LjAwMSAgIGMtMTAuMDI3LTYuNTA2LTkuOTItMjEuMjIsMC4yMDEtMjcuNTc4bDEwLjM2OC02LjUxNGMxNy4yNTYtMTAuODQxLDM4LjIzNC0xNC4wNDMsNTcuOTM4LTguODQ2bDIxMC44NSw1NS42MTYgICBjNjUuNzQyLTI2LjA5NCwxMjUuMTgxLTQzLjkwNCwxNjAuMzYzLTQzLjkwNGM5LjM5NiwwLDE4LjgwNiwwLjI0OSwyNy44ODcsMC44OThsLTYzLjY3NSwyOC43NDVsLTEuNTI0LDIxLjQxOGw5OC4yOS00NS4xODMgICBDNTk3LjY2MSwxNjQuMjcyLDYxMiwxNzQuNzU5LDYxMiwxOTUuNzIyeiBNMzU1LjQ5MiwzNzguNDc2bDc4LjY0OCw4OS4zNDRjNC43OTMsNS40NDUsMTIuNTk5LDcuMDg0LDE5LjE3Niw0LjAyN2wxMC41MzMtNC44OTYgICBjMTkuMjA4LTguOTI4LDMwLjUyMS0yOS4xNzIsMjguMDYxLTUwLjIwOWwtOS44NDYtODQuMTg2Yy0wLjYxLTUuMjA5LTUuODk2LTguNTA2LTEwLjg0My02Ljc2NGwtMTEyLjMwOCwzOS41NjIgICBDMzUzLjQ0NywzNjcuMjgxLDM1MS42NjEsMzc0LjEyNSwzNTUuNDkyLDM3OC40NzZ6IiBmaWxsPSIjZmRiZTE0IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg==" />
                <div className="companyName">
                    <h1 className="tittle">Bond</h1>
                    <p className="subTittle">Fly Bond</p>
                </div>
            </div>

            <div className="icons">
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="socialNetwork fab fa-facebook-square"></i></a>
                <a href="https://www.twitter.com/" target="_blank" rel="noreferrer"><i className="socialNetwork fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="socialNetwork fab fa-instagram"></i></a>
            </div>
    </footer>
    )
}

export default Footer;