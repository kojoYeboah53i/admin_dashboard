window.addEventListener('load', () => {

    //get admin name
    const adminName = document.querySelector('#admin-name');
    //get all url parameters
    const params = new URLSearchParams(window.location.search);
    
    if(params.has('name')){
        adminName.innerHTML = params.get('name');
    }


    async function getAllEmployees() {
        const results = await fetch('https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/employer/1')
        const response = await results.json();
        // console.log(response); //Fetch ends here


        const employees = response.employee;
        // console.log(employees);

        const tbody = document.querySelector('tbody');
        let tContents = '';

        employees.forEach(employee => {
            tContents += `
            <tr class="wrapper">
            <td>${employee.job_title}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>
            <span>
            <i class="fas fa-edit" edit-id="${employee.id}" data-bs-toggle="modal" data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"> </i>
            <i class="fas fa-trash" delete-id="${employee.id}"> </i>
            </span>
            </td>
            </tr>
            `;
            tbody.innerHTML = tContents;
        });

        // delete icon event listener 
        const deleteBtns = document.querySelectorAll('.fa-trash');

        deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', async (e) => {
                const employeeId = deleteBtn.getAttribute('delete-id');
                console.log(employeeId);

                try {

                    let confirmed = confirm(`Are you sure you want to delete employee ${employeeId}`);

                    if (confirmed === true) {
                        const result = await fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/employee/${employeeId}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });    // fetch ends here
                        if (result.status === 200 || result.status === 201) {
                            console.log("Deleted successfully");

                            // transition
                            const usr = e.target.parentElement.parentElement;
                            const user = usr.parentElement;
                            user.classList.add('remove-deleted');
                            user.addEventListener('transitionend', () => {
                                user.remove();
                            })
                        }
                        return true;
                    }

                } catch (error) {
                    console.error(error);
                }
            });
        });

        // edit icon event listener 
        const editBtns = document.querySelectorAll('.fa-edit');
        editBtns.forEach(editBtn => {
            editBtn.addEventListener('click', async () => {

                const modal = document.querySelector('.modal');
                const employeeId = editBtn.getAttribute('edit-id');

                //     modal.style.display = 'flex';

                let confirmed = confirm(`Are you sure you want to update employee ${employeeId}`);

                if (confirmed === true) {
                    try {
                        const result = await fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/employee/${employeeId}`);
                        const response = await result.json();
                        console.log(response);

                        modal.querySelector('#nameInput').value = response.name;
                        modal.querySelector('#jobInput').value = response.job_title;
                        modal.querySelector('#emailInput').value = response.email;
                        document.querySelector('div.d-none').id = response.id;


                    } catch (error) {
                        console.error(error);
                    }
                }

            });
        });

        const updateEmployee = document.querySelector('.submitUpdate');
        updateEmployee.addEventListener('click', async () => {
            let name = document.querySelector('#nameInput').value;
            let email = document.querySelector('#emailInput').value;
            let job = document.querySelector('#jobInput').value;
            let employee = document.querySelector('div.d-none').id; //set id to employee such that employee reference will pull the id

            if (name == "" || name == null || email == "" || email == null || job == "" || job == null) {
                alert('please fill all form inputs')
                return true;

            } else {

                const confirmed = confirm("Are you sure you want to update employee " + employee)


                //check if id is not null
                if (confirmed == true) {

                    const result = await fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/update-employee/${employee}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: name,
                            job_title: job,
                            email: email

                        })
                    })

                    if (result.status == 200 || result.status == 201) {

                        // this redirects to the same page with the updated changed
                        window.location.href = "./dashboard.html";

                        // alert("employee updated successfully...!");
                    }
                }

            }

        })

    } getAllEmployees();

    // toggler
    const light_mode = document.querySelector("div.theme-toggler span.light_mode");
    const dark_mode = document.querySelector("div.theme-toggler span.dark_mode");

    dark_mode.addEventListener('click', () => {
        document.body.classList.add('dark-theme-variables');
        dark_mode.classList.add('active');
        light_mode.classList.remove('active');
    });

    light_mode.addEventListener('click', () => {
        document.body.classList.remove('dark-theme-variables');
        dark_mode.classList.remove('active');
        light_mode.classList.add('active');
    });

    // logout
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "index.html";
    });

})

