<script>
    import { Tabs } from '@skeletonlabs/skeleton-svelte';
    let group = $state('Input')

    let firstName = $state('');
    let lastName = $state('');
    let id = $state('');

    function checkCharIsAlphabet(event) {
        value(event.target.value.replace(/[^a-zA-Z\s]/g, ''));
    }

    function checkIsNumber(){
        id = id.replace(/[^0-9]/g,'')
    }
    
</script>

<div class="card preset-filled-surface-100-900 border-[1px] border-surface-200-800 w-2/3 h-full p-4 text-center py-6 justify-self-center">

    <Tabs bind:value={group} fluid>
        {#snippet list()}
            <Tabs.Control value="Input">Clock-In/ Clock-Out</Tabs.Control>
            <Tabs.Control value="Database">Database</Tabs.Control>
        {/snippet}
        {#snippet content()}
            <Tabs.Panel value="Input">
                <div class="space-y-8 w-1/3 justify-self-center">
                    <div class="gap-6">
                        <label class="EmployeeID">
                            <h6 class="h6 pb-2">Employee ID</h6>
                            <input class="input" type="text" placeholder="Employee ID" maxlength="6" bind:value={id} oninput={checkIsNumber}/>
                        </label> 
                    </div>
                    <div class="gap-6">
                        <label class="FirstName">
                            <h6 class="h6 pb-2">First Name</h6>
                            <input bind:value={firstName} oninput={(event) => checkCharIsAlphabet(event, (value) => firstName = value)} class="input" type="text" placeholder="First Name"/>
                        </label> 
                    </div>
                    <div class="gap-6">
                        <label class="LastName">
                            <h6 class="h6 pb-2">Last Name</h6>
                            <input bind:value={lastName} oninput={(event) => checkCharIsAlphabet(event, (value) => lastName = value)} class="input" type="text" placeholder="Last Name"/>
                        </label> 
                    </div>
                    <div class="gap-6 gap-x-8 flex justify-self-center">
                        <button type="button" class="btn preset-filled-surface-500">Clock-In</button>
                        <button type="button" class="btn preset-filled-surface-500">Clock-Out</button>
                    </div>
                </div>
            </Tabs.Panel>
        <Tabs.Panel value="Database">Database things </Tabs.Panel>
        {/snippet}
    </Tabs>
</div>

<style>
    .input::-webkit-inner-spin-button{
        -webkit-appearance: none;
    }
</style>