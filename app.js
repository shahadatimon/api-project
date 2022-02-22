
const skill =document.getElementById('skill');
const modal_form =document.getElementById('modal_form');
const all_dev_data =document.getElementById('all_dev_data');
const view_modal =document.getElementById('view_modal');


// skill 
 const alloption = () => {

    axios.get('http://localhost:5050/skill').then(data => {
        let alldata = '';
         data.data.map(allskill =>{
            alldata += `
                <option value="${allskill.id}">${allskill.skill}</option>
            `;
         });
         skill.insertAdjacentHTML('beforeend',alldata);

    });
 };
 alloption();
 
 // skill end


 //form-data-get
 
 const dataget = () => {
    axios.get('http://localhost:5050/deves').then(res => {
       let allformdata='';
       res.data.map( data => {
         allformdata += `
                 <tr>
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>${data.age}</td>
                    <td>${data.location}</td>
                    <td>${data.number}</td>
                    <td>${data.skillId}</td>
                    <td><img width="30px" src="${data.photo}" alt=""></td>
                    <td>
                      <a class="btn btn-info btn-sm" onclick="dataview(${data.id})" data-bs-toggle="modal" href="#claose_view"><i class="fa fa-eye"></i></a>
                      <a class="btn btn-warning btn-sm" onclick="dataedit(${data.id})" data-bs-toggle="modal" href="#claose_edit"><i class="fa fa-edit"></i></a>
                      <a class="btn btn-danger btn-sm" onclick="datadelete(${data.id})" href="#"><i class="fa fa-trash-alt"></i></a>
                    </td>

                  </tr>
         `;

       });

       all_dev_data.innerHTML = allformdata;
    });
 };
 dataget();

//  delete funtion
 function datadelete (id) {
    let con = confirm('Are you sre?');
    if(con){
      axios.delete(`http://localhost:5050/deves/${id}`).then(res => {
         dataget();
      });
    }else{
       return false
    }
   
 };
//  view modal funtiom
function dataview (id){
   axios.get(`http://localhost:5050/deves/${id}`).then(res => {

      view_modal.innerHTML = `
      
                <div class="row">
                  <div class="col-lg-5">
                    <img class="w-100" src="${res.data.photo}" alt="">
                  </div>
                  <div class="col-lg-7">
                    <div class="d-d">
                      <h3>Name :${res.data.name}</h3>
                      <span>Age :${res.data.age}</span><br>
                      <span>Location :${res.data.location}</span><br>
                      <span><b>Number :${res.data.number}</b></span> <br>
                      <span>Skill :${res.data.skillId}</span>
                    </div>
                  </div>
                </div>`;
   })
};

// form eidt funtion start that

function dataedit (id){
   
   let name = document.getElementById('ename');
   let age = document.getElementById('eage');
   let loc = document.getElementById('eloc');
   let nub = document.getElementById('enub');
   let skill = document.getElementById('skill');
   let photo = document.getElementById('ephoto');
   let new_photo = document.getElementById('new_photo');

   axios.get(`http://localhost:5050/deves/${id}`).then(res => {

   name.value  = res.data.name,
   age.value   = res.data.age,
   loc.value   = res.data.location,
   nub.value   = res.data.number,
   skill.value = res.data.skillId,
   photo.value = res.data.photo
   new_photo.setAttribute('src', res.data.photo);
   
   });

};





 // form-submit start//
 modal_form.addEventListener('submit', function(e){
    e.preventDefault();

    let name = this.querySelector('#name');
    let age = this.querySelector('#age');
    let loc = this.querySelector('#loc');
    let num = this.querySelector('#nub');
    let skill = this.querySelector('#skill');
    let photo = this.querySelector('#photo');
    
    
    if( name.value == '' || age.value == '' || loc.value == '' || num.value == '' || skill.value == '' || photo.value == ''){
       alert('All Field are requred');
    }else{

      axios.post('http://localhost:5050/deves', {
         id         : "",
         name       : name.value,
         age        : age.value,
         location   : loc.value,
         number     : num.value,
         skillId      : skill.value,
         photo      : photo.value
      }).then(res => {
         name.value = '';
         age.value = '';
         loc.value = '';
         num.value = '';
         skill.value = '';
         photo.value = '';

      dataget();

      });
    };

 });

