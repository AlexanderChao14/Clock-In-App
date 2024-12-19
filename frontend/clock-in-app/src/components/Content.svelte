<script>
    import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import { writable } from 'svelte/store';
    let group = $state('Database')

    let firstName = $state('');
    let lastName = $state('');
    let id = $state('');

    function checkCharIsAlphabet(event, value) {
        value(event.target.value.replace(/[^a-zA-Z\s]/g, ''));
    }

    function checkIsNumber(){
        id = id.replace(/[^0-9]/g,'')
    }

    let handleClockIn = () => employeeDB.update( prev=>{
        if(id === '' || firstName ==='' || lastName ===''){
            alert("Please check that all input are not empty")
            return prev
        }
        else if(id.length != 6){
            alert("Please enter a 6 digit id number")
            return prev
        }
        const date = new Date()

        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()

        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        let dateTime = year+'-'+month+'-'+day+'@'+hour+':'+minute+':'+second
        console.log(dateTime)
        let newClockIn = {id:id, firstName:firstName, lastName:lastName, clockInTimeStamp:dateTime, clockOutTime:null}
        console.log(employeeDB, newClockIn)
        return [...prev, newClockIn]
    })

    const employeeDB = writable([
        {id:'123456', firstName: "Mike", lastName: "Smith", clockInTimeStamp: "2023-11-12@13:52:22", clockOutTime:"2023-11-12@20:22:22"},
        {id:'222222', firstName: "Chris", lastName: "John", clockInTimeStamp: "2024-10-10@1:52:22", clockOutTime:"2024-10-10@11:52:22"},
        {id:'123456', firstName: "Mary", lastName: "Jean", clockInTimeStamp: "2024-12-18@20:52:22", clockOutTime:null}
    ])
    
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
                            <input class="input" type="text" placeholder="Employee ID" maxlength="6" bind:value={id} oninput={checkIsNumber}/>
                        </label> 
                    </div>
                    <div class="gap-6">
                        <label class="FirstName">
                            <h6 class="h6 pb-2">First Name</h6>
                            <input bind:value={firstName} oninput={(event) => checkCharIsAlphabet(event, (value) => firstName = value)} class="input" type="text" placeholder="First Name">
                        </label> 
                    </div>
                    <div class="gap-6">
                        <label class="LastName">
                            <h6 class="h6 pb-2">Last Name</h6>
                            <input bind:value={lastName} oninput={(event) => checkCharIsAlphabet(event, (value) => lastName = value)} class="input" type="text" placeholder="Last Name"/>
                        </label> 
                    </div>
                    <div class="gap-6 gap-x-8 flex justify-self-center">
                        <button type="submit" class="btn preset-filled-surface-500" onclick={handleClockIn}>Clock-In</button>
                        <button type="button" class="btn preset-filled-surface-500">Clock-Out</button>
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
                                    <td class="text-xs md:text-base text-wrap">{item.id}</td>
                                    <td class="text-xs md:text-base text-wrap">{item.firstName}</td>
                                    <td class="text-xs md:text-base text-wrap">{item.lastName}</td>
                                    <td class="text-xs md:text-base text-wrap">{item.clockInTimeStamp}</td>
                                    <td class="text-xs md:text-base text-wrap">{item.clockOutTime}</td>
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
    .td{
        font-size: 11px;
    }
</style>