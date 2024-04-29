"use strict";
//
const root = document.querySelector(".root");
const fName = document.querySelector('.fName');
const lName = document.querySelector('.lName');
const address = document.querySelector('.address');
const birthDate = document.querySelector('.birthDate');
const position = document.querySelector('.position_form');
const positionType = document.querySelector('.position_type');
const salary = document.querySelector('.salary');
const isMarriedCheck = document.querySelector('#flexCheckDefault');
const addBtn = document.querySelector('.saved_btn');
const search = document.querySelector(".search_inp");
const positionTypeFilter = document.querySelector(".type_position");
const isMarriedFilter = document.querySelector(".isMarried_box");
let dataBase = [];
const storedData = localStorage.getItem('datas');
if (storedData) {
    dataBase = JSON.parse(storedData);
}
const rootData = (dataBase) => {
    let str = '';
    dataBase.forEach((data, i) => {
        str += `
        <tr>
            <th>${i + 1}</th>
            <td>${data.firstName}</td>
            <td>${data.lastName}</td>
            <td>${data.address}</td>
            <td>${data.birthDate}</td>
            <td>${data.position}</td>
            <td>${data.typePosition}</td>
            <td>${data.salary}</td>
            <td>${data.isMarried ? "Yes" : "No"}</td>
            <td>
            <button type="submit" data-bs-toggle="modal"
            data-bs-target="#exampleModal" class="btn btn-primary" onclick = 'editBtn(${data.id})'>Edit</button>
            <button type="submit" class="btn btn-danger" onclick = 'deleteBtn(${data.id})'>Delete</button>
            </td>
        </tr>
        `;
    });
    root.innerHTML = str;
};
rootData(dataBase);
addBtn.addEventListener('click', () => {
    let dataBase = [];
    const storedData = localStorage.getItem('datas');
    if (storedData) {
        dataBase = JSON.parse(storedData);
    }
    let newData = {
        id: Math.floor(Math.random() * 1000000),
        firstName: fName.value,
        lastName: lName.value,
        address: address.value,
        birthDate: birthDate.value,
        position: position.value,
        typePosition: positionType.value,
        salary: salary.value,
        isMarried: isMarriedCheck.checked,
    };
    if ((fName === null || fName === void 0 ? void 0 : fName.value) == "" && (lName === null || lName === void 0 ? void 0 : lName.value) == "") {
        alert("Please field text");
    }
    else {
        let newDatas = [...dataBase, newData];
        rootData(newDatas);
        localStorage.setItem('datas', JSON.stringify(newDatas));
        fName.value = "";
        lName.value = "";
        address.value = 'Tashkent';
        birthDate.value = "";
        position.value = "React";
        positionType.value = "Junior";
        salary.value = "";
        isMarriedCheck.checked = false;
    }
});
// delete
const deleteBtn = (dataId) => {
    if (confirm("Are you sure delete this")) {
        let dataBase = [];
        const storedData = localStorage.getItem('datas');
        if (storedData) {
            dataBase = JSON.parse(storedData);
        }
        let newData = dataBase.filter(e => e.id !== dataId);
        rootData(newData);
        localStorage.setItem('datas', JSON.stringify(newData));
    }
};
// edit
const editBtn = (dataId) => {
    let dataBase = [];
    const storedData = localStorage.getItem('datas');
    if (storedData) {
        dataBase = JSON.parse(storedData);
    }
    let newData = dataBase.find(e => e.id == dataId);
    let studentDefId = newData === null || newData === void 0 ? void 0 : newData.id;
    if (newData) {
        fName.value = newData.firstName || '';
        lName.value = newData.lastName || '';
        address.value = newData.address || '';
        birthDate.value = newData.birthDate.toString() || '';
        position.value = newData.position || '';
        positionType.value = newData.typePosition || '';
        salary.value = newData.salary.toString() || '';
        isMarriedCheck.checked = newData.isMarried || false;
    }
    else {
        fName.value = '';
        lName.value = '';
        address.value = '';
        birthDate.value = '';
        position.value = '';
        positionType.value = '';
        salary.value = '';
        isMarriedCheck.checked = false;
    }
    addBtn.addEventListener('click', e => {
        e.preventDefault();
        let studentUpd = {
            id: studentDefId,
            firstName: fName.value,
            lastName: lName.value,
            address: address.value,
            birthDate: birthDate.value,
            position: position.value,
            typePosition: positionType.value,
            salary: salary.value,
            isMarried: isMarriedCheck.checked,
        };
        let dataBase = [];
        const storedData = localStorage.getItem('datas');
        if (storedData) {
            dataBase = JSON.parse(storedData);
        }
        let newStudent = dataBase.map(student => student.id === studentDefId ? studentUpd : student);
        rootData(newStudent);
        localStorage.setItem('datas', JSON.stringify(newStudent));
    });
};
// search
search.addEventListener('input', e => {
    let b = e.target.value.toLowerCase();
    let dataBase = [];
    const storedData = localStorage.getItem('datas');
    if (storedData) {
        dataBase = JSON.parse(storedData);
    }
    let filterData = dataBase.filter(e => e.firstName.toLowerCase().includes(b) ||
        e.lastName.toLowerCase().includes(b));
    rootData(filterData);
});
positionTypeFilter.addEventListener('click', e => {
    let b = e.target.value;
    let dataBase = [];
    const storedData = localStorage.getItem('datas');
    if (storedData) {
        dataBase = JSON.parse(storedData);
    }
    if (b == "all") {
        rootData(dataBase);
    }
    else {
        let filterData = dataBase.filter(e => e.typePosition.includes(b));
        rootData(filterData);
    }
});
isMarriedFilter.addEventListener('click', e => {
    let b = e.target.value;
    let dataBase = [];
    const storedData = localStorage.getItem('datas');
    if (storedData) {
        dataBase = JSON.parse(storedData);
    }
    if (b == "all") {
        rootData(dataBase);
    }
    else if (b == "true") {
        let filterData = dataBase.filter(e => e.isMarried == true);
        rootData(filterData);
    }
    else {
        let filterData = dataBase.filter(e => e.isMarried == false);
        rootData(filterData);
    }
});
