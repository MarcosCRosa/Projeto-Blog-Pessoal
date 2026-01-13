function Home() {
    return (
        <>
        <main>
            <section style={{
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              backgroundColor:"#5f46c4"
            }}>
                <article style={{
                   display:"flex",
                   flexDirection:"column",
                   alignItems:"center",
                   justifyContent:"center",
                   color:"white"
                }}>
                 <h2 style={{fontSize:"3rem",fontWeight:"bold"}}>
                  Seja Bem Vinde!</h2>
                 <p style={{fontSize:"1.25rem"}}>Expresse aqui os seus pensamentos e opniões</p>
                 <button style={{border:"1rem",borderRadius:"5px", padding:"0.5rem"}}>Nova Postagem</button>
                </article>
                <figure>
                <img src="https://i.imgur.com/fyfri1v.png" alt="" style={{width:"65%"}}/>
                </figure>
            </section>
        </main>
        </>
    )
}

export default Home