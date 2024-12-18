<script>
    import Header from "./Header.svelte"
    import Wrapper from "./Wrapper.svelte"
    import Content from "./Content.svelte";
</script>

<Wrapper>
    <Header/>
    <div class="grid grid-cols-1 md:grid-cols-[auto_1fr_auto]">
        <aside>

        </aside>
        <Content/>
        <aside>

        </aside>
    </div>
</Wrapper>