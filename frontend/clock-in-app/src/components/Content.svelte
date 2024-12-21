<script>
	import { goto } from '$app/navigation';
    import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import { onMount, tick } from 'svelte';
	import { writable } from 'svelte/store';

    let group = $state('Input')

    let firstName = $state('');
    let lastName = $state('');
    let id = $state('');

    // We will assume only alphabet letters and spaces are allowed in the first and last name entry field
    function checkCharIsAlphabet(event, value) {
        value(event.target.value.replace(/[^a-zA-Z\s]/g, ''));
    }

    // We will assume only numbers can be added in the id entry field
    function checkIsNumber(){
        id = id.replace(/[^0-9]/g,'')
    }

    onMount(async function () {
        console.log("Running on mount")
        const endpoint = import.meta.env.VITE_API_BASE_URL
        const response = await fetch(endpoint)
        const data = await response.json()
        // console.log(data)

        data.map(obj => {
            if (obj.hasOwnProperty('id')){
                obj.id= obj.id.toString().padStart(6,'0')
            }
            if (obj.hasOwnProperty('employeeId')){
                obj.employeeId= obj.employeeId.toString().padStart(6,'0')
            }
        })
        
        employeeDB.set(data)
    })

    async function updateFrontEndDB() {
        const endpoint = import.meta.env.VITE_API_BASE_URL
        const response = await fetch(endpoint)
        const data = await response.json()
        
        data.map(obj => {
            if (obj.hasOwnProperty('id')){
                obj.id= obj.id.toString().padStart(6,'0')
            }
            if (obj.hasOwnProperty('employeeId')){
                obj.employeeId= obj.employeeId.toString().padStart(6,'0')
            }
        })
        // console.log(data)
        
        employeeDB.set(data)
        // location.reload()
    }


    let handleClockIn = () => employeeDB.update( prev=>{
        // We will assume that all field need to be filld in order to clock-in or out
        if(id === '' || firstName ==='' || lastName ===''){
            alert("Please check that all input are not empty")
            return prev
        }
        // We will assume that no id can be less that 6 digits when entering 
        else if(id.length != 6){
            alert("Please enter a 6 digit id number")
            return prev
        }

        // We assume that a person clocked in has a timestamp data entry with a null/ blank clockOut data field
        let clockInData={}
        if($employeeDB.length){
            clockInData = $employeeDB.find(clockInData => (clockInData.employeeId == id && clockInData.clockOut == null))
            // Checking and assuming that if a user has an entry clock in time and no clock out time. Then you cannot clock in again until you have clocked out.
            if(clockInData){
                alert("This employee is already clocked in")
                document.getElementById('idInputField').value=''
                document.getElementById('firstNameInputField').value=''
                document.getElementById('lastNameInputField').value=''
                return prev
            }
        }

        const endpoint= import.meta.env.VITE_API_BASE_URL

        let date = new Date()
        date = date.toISOString()
        var newDate = date.substring(0,10)+' '+date.substring(11,19)

        let inputData = new FormData()
        inputData.append('employeeId', id)
        inputData.append('firstName', firstName)
        inputData.append('lastName', lastName)
        inputData.append('clockIn', newDate)
        

        fetch(endpoint, {method: 'POST', body: inputData}).then(response => response.json()).then(data =>{
            data.id = data.id.toString().padStart(6,'0')
            data.employeeId = data.employeeId.toString().padStart(6,'0')
            // console.log(data)
            employeeDB.update(prev => [...prev, data])
        })  
        
        tick().then(()=>{
            console.log('UI Component just updated')
            updateFrontEndDB()
            document.getElementById('idInputField').value=''
            document.getElementById('firstNameInputField').value=''
            document.getElementById('lastNameInputField').value=''
        })

    })


    let handleClockOut = () => employeeDB.update( prev=>{
        // We will assume that all field need to be filld in order to clock-in or out
        if(id === '' || firstName ==='' || lastName ===''){
            alert("Please check that all input are not empty")
            return prev
        }
        // We will assume that no id can be less that 6 digits when entering 
        else if(id.length != 6){
            alert("Please enter a 6 digit id number")
            return prev
        }

        // We assume that a person clocked in has a timestamp data entry with a null/ blank clockOut data field
        let clockInData={}
        if($employeeDB.length){
            // looking for a matching clocked In data entry by matching employee id with a null clock out time
            clockInData = $employeeDB.find(clockInData => (clockInData.employeeId == id && clockInData.clockOut == null))
            // Checking to see if user is clocked in by searching for their employeeId and a null clockOut data field.
            if( clockInData==null){
                alert("This employee has not clocked in yet.")
            }   
            // Error handling and making sure the first name and last name enter matches the grabbed data
            else if (clockInData.firstName != firstName || clockInData.lastName != lastName){
                alert("Please make sure the entered information is correct!")
            }
        }

        
        const endpoint= `${import.meta.env.VITE_API_BASE_URL}/${clockInData.id}/`
        // console.log(clockInData)
        // console.log(endpoint)

        let date = new Date()
        date = date.toISOString()
        var newDate = date.substring(0,10)+' '+date.substring(11,19)

        let inputData = new FormData()
        inputData.append('employeeId', clockInData.employeeId)
        inputData.append('firstName', clockInData.firstName)
        inputData.append('lastName', clockInData.lastName)
        inputData.append('clockIn', clockInData.clockIn)
        inputData.append('clockOut', newDate)
        

        fetch(endpoint, {method: 'PUT', body: inputData}).then(response => response.json()).then(data =>{
            employeeDB.update(prev =>{
                let updatedTimeStamp = $employeeDB.slice()
                let index = updatedTimeStamp.findIndex( clockInData => clockInData.id == data.id)
                // console.log(index)
                updatedTimeStamp[index].clockOut = newDate
                // console.log(updatedTimeStamp)
                return updatedTimeStamp
            })
    
            // data.id = data.id.toString().padStart(6,'0')
            // data.employeeId = data.employeeId.toString().padStart(6,'0')
            // employeeDB.update(prev => [...prev, data])
            // $employeeDB.set(data)
        })  
        // console.log(employeeDB)
        
        tick().then(()=>{
            console.log('Component just updated')
            updateFrontEndDB()
            document.getElementById('idInputField').value=''
            document.getElementById('firstNameInputField').value=''
            document.getElementById('lastNameInputField').value=''
        })

    })


    // onMount(async function () {
    //     let clockInData={}
    //     if($employeeDB.length){
    //         clockInData = $employeeDB.find(clockInData => clockInData.employeeId == id)
    //     }
    // })

    // Function to format the date time data entry for clock in and out to make it more readable.
    function formatTime(input){
        if(input == null){
            return input
        }else{
            let newFormat = input.substring(0,10)+'@'+input.substring(11,19)
            return newFormat
        }
    }

    const employeeDB = writable([])
    
</script>

<div class="card preset-filled-surface-100-900 border-[1px] border-surface-200-800 w-5/6 h-full p-4 text-center py-6 justify-self-center">

    <Tabs bind:value={group} fluid>
        {#snippet list()}
            <Tabs.Control value="Input">Clock-In/ Clock-Out</Tabs.Control>
            <Tabs.Control value="Database">Database</Tabs.Control>
        {/snippet}
        {#snippet content()}
            <Tabs.Panel value="Input">
                <div class="space-y-8 w-1/3 justify-self-center" >
                    <div class="gap-6">
                        <label class="EmployeeID">
                            <h6 class="h6 pb-2">Employee ID</h6>
                            <input class="input" type="text" placeholder="Employee ID" maxlength="6" bind:value={id} oninput={checkIsNumber} id="idInputField"/>
                        </label> 
                    </div>
                    <div class="gap-6">
                        <label class="FirstName">
                            <h6 class="h6 pb-2">First Name</h6>
                            <input bind:value={firstName} oninput={(event) => checkCharIsAlphabet(event, (value) => firstName = value)} class="input" type="text" placeholder="First Name" id="firstNameInputField"/>
                        </label> 
                    </div>
                    <div class="gap-6">
                        <label class="LastName">
                            <h6 class="h6 pb-2">Last Name</h6>
                            <input bind:value={lastName} oninput={(event) => checkCharIsAlphabet(event, (value) => lastName = value)} class="input" type="text" placeholder="Last Name" id="lastNameInputField"/>
                        </label> 
                    </div>
                    <div class="gap-6 gap-x-8 flex justify-self-center">
                        <button type="submit" class="btn preset-filled-surface-500" onclick={handleClockIn}>Clock-In</button>
                        <button type="button" class="btn preset-filled-surface-500" onclick={handleClockOut}>Clock-Out</button>
                    </div>
                </div>
            </Tabs.Panel>
        <Tabs.Panel value="Database">
            <div class="justify-self-center max-w-auto">
                <table class="table table-auto border-collapse caption-top">
                    <caption>
                        Employee Timesheet Database
                      </caption>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Clock-In Time</th>
                            <th>Clock-Out Time</th>
                        </tr>
                    </thead>
                    <tbody class="hover:[&>tr]:preset-tonal-primary">
                        {#each $employeeDB as item}
                                <tr>
                                    <td class="text-xs md:text-base text-wrap">{item.employeeId}</td>
                                    <td class="text-xs md:text-base text-wrap">{item.firstName}</td>
                                    <td class="text-xs md:text-base text-wrap">{item.lastName}</td>
                                    <td class="text-xs md:text-base text-wrap">{formatTime(item.clockIn)}</td>
                                    <td class="text-xs md:text-base text-wrap">{formatTime(item.clockOut)}</td>
                                </tr>
                        {/each}      
                    </tbody>
                </table>
            </div>    
        </Tabs.Panel>
        {/snippet}
    </Tabs>
</div>

<style>
    .input::-webkit-inner-spin-button{
        -webkit-appearance: none;
    }
</style>