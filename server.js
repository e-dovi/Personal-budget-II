const express = require('express');
const app = express();

app.use(express.json());
const Client=require('pg').Client
const client = new Client({
  user: 'database user',
  host: 'localhost',
  database: 'Budget',
  password: 'password',
  port: port,
})
const connect = async ()=>{
    await client.connect()
  }
  
  connect();

const PORT=5000;


//GET all  envelopes
app.get('/envelopes', (req, res)=>{
    client.query('SELECT * FROM envelopes', (error, results)=>{
        if (error){
            throw error;
        }
        else{
            res.json(results.rows);
        }
    })
})

//GET a specific envelope
app.get('/envelope/:id', (req, res)=>
    
{   const val=req.params.id
    client.query('SELECT * FROM envelopes WHERE name= $1', [val], (error, results)=>{
        if (error){
            throw error
        }
        else{
            res.json(results.rows);
        }
    })
}
)

// Withdraw money from a certain envelope
app.post('/withdraw/:id', (req, res)=>{
    const env=req.params.id;
    const amt=req.body.amount;
    
    client.query('SELECT * FROM envelopes WHERE name=$1', [env], (error, results)=>{
        if(error){
            res.send('Something went wrong');
        }
        else{
        valMax=results.rows[0]['maximum'];
        valEx=results.rows[0]['expense'];
        }

        if(valMax-valEx>=amt){
            client.query('UPDATE envelopes SET expense=expense+$1 WHERE name=$2', [amt, env], (error, results)=>{
                if (error){
                    throw error;
                }
                else{
                    res.send('Success...')
                }
            }) 
         }
        else if(valMax-valEx<=amt){
            res.send('Sorry you do not have enough money in this envelope...');
        }
    })

})

//Add an envelope

app.post('/envelope/add', (req, res)=>{
    const env=req.body.name;
    const max=req.body.max;
    client.query('INSERT INTO envelopes VALUES ($1, $2, 0)', [env, max], (error, result)=>{
        if (error){
            throw error;
        }
        else{
            res.send('Added successfully...');
        }
    })
})

//Delete an envelope
app.delete('/envelope/delete/:id', (req, res)=>{
    const env=req.params.id;
    client.query('DELETE FROM envelopes WHERE name=$1', [env], (error, result)=>{
        if (error){
            throw error;
        }
        else{
            res.send('Deleted successfully...');
        }
    })
} )

//Transfer money from an envelope to the other.
app.put('/transfer/:from/:to', (req, res)=>{
    const amt=req.body.amount;
    const f_env=req.params.from;
    const to_env=req.params.to;
    client.query('SELECT * FROM envelopes WHERE name=$1', [f_env], (error, result)=>{
        if (error){
            res.send('Sorry something went wrong...');
        }
        else{
            const val=result.rows[0];
            if (val['maximum'] - val['expense']<amt){
                res.send('Sorry insufficient fund...');
            }
            else{
                client.query('UPDATE envelopes SET expense=expense+$1 WHERE name=$2', [amt, f_env], (error, result)=>{
                    if(error){
                        res.send('error with the sending envelope');
                    }
                    else{
                        client.query('UPDATE envelopes SET maximum=maximum+$1 WHERE name=$2', [amt, to_env], (error, result)=>{
                            if (error){
                                res.send('Error with the receiving envelope');
                            }
                            else{
                                res.send('Transfer successfull...')
                            }
                        })
                    }
                })
            }
        }
    })
    
})

//Listening...
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`);
})
