const express = require('express');
const router = express()
const mongoose = require('mongoose')


require('./Movie')
const Movie = mongoose.model('movies')
require('./Gener')
const Gener = mongoose.model('geners')

router.get('/movies', async(req, res) => {
    try{
        const movies = await Movie.find().lean().sort({date: 'asc'})
        const geners = await Gener.find().lean()
        res.render('movies', {
            movies: movies,
            geners: geners
        })
    }catch(err){
        req.flash('error_msg', 'Erro')
        res.redirect('/')
    }
})

router.get('/addMovie', async(req, res) => {
    try{
        const geners = await Gener.find().lean()

        res.render('addMovie', {
            geners: geners
        })
    }catch(err){

    }
})

router.get('/addGener', async(req, res) => {
    try{
        res.render('addGener')
    }catch(err){

    }

})


router.post('/addGener', async (req, res) => {
    try{
        const newGener = {
            name: req.body.name
        }

        new Gener(newGener).save()
        req.flash('success_msg', 'Genero cadastrado com sucesso')
        res.redirect('/')
    }catch(err){
        req.flash('erros_msg', "erro ao cadastrar genero")
        res.redirect('/')
    }
})


router.post('/addMovie', async(req, res) => {
    try{

        const gener = await Gener.findOne({_id: req.body.gener}).lean()

        const newMovie = {
            name: req.body.name,
            country: req.body.country,
            date: req.body.date,
            gener: gener.name,
            access: parseInt(req.body.access)
        }

        new Movie(newMovie).save()
        req.flash('success_msg', 'Filme cadastrado com sucesso')
        res.redirect('/movies')

    }catch(err){
        req.flash('error_msg', 'Erro ao cadastrar filme' +err)
        res.redirect('/')
    }
})



router.get('/top', async (req, res) => {
    try{
        const tops = await Movie.find().lean().sort({access: 'desc'})
        res.render('top', {
            tops: tops
        })
    }catch(err){

    }
})


router.get('/:gener', async(req, res) => {
    try{
        const movies = await Movie.find({gener: req.params.gener}).lean()
        res.render('movieGener', {
            movies: movies
        })
    }catch(err){

    }
})



module.exports = router