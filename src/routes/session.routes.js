import { Router } from 'express';

sessionRoutes.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user){
            return res.status(404).json({message: 'User not found'});
        }
        if (user.password !== password) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        res.status(400).send({error});
    }
});


sessionRoutes.post('/logout', async(req, res) => {
    try {
        req.session.destroy((err)=> {
            if(err){
                return res.status(500).json({message: 'Logout failed'});
            }
        });
        res.send({redirect: 'http://localhost:8080/login'});
    } catch (error) {
        res.status(400).send({error});
    }
})