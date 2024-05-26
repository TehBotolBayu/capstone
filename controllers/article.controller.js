import express, { Express, Request, Response } from "express";
import Articles from "../models";

export async function postOne(req, res) {
    try {
        const {titleid, title, content, author} = req.body;
        await Articles.create({titleid, title, content, author})
        return res.status(201).json(
            {message: "Content Uploaded"})
    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        )
    }
}

export async function getAll(req, res) {
    try {
        const data = await Articles.find().limit(100).lean();
        const dataWithLink = data.map((article) => {
            return {
                ...article,
                links: {
                    read: '/read/'+article?.titleid
                }
        }})
        return res.status(200).json(
            {message: "Fetch success", data: dataWithLink})
    } catch (error) {
        console.log("error: "+error);
        return res.status(404).json(
            {message: "Error occured"}
        )
    }
}

export async function getById(req, res) {
    try {
        const id  = req.params.id;
        const data = await Articles.findById(id).lean();
        if (!data) return res.status(404).json({ message: 'Item not found' });
        return res.status(200).json({
            message: "Fetch by id success", 
            data
        })
    } catch (error) {
        console.log("error: "+error);
        return res.status(404).json(
            {message: "Error occured"}
        )
    }
}

export async function getByUserId(req, res) {
    try {
        const id  = req.params.id;
        const data = await Articles.find({author:id}).lean();
        if (!data) return res.status(404).json({ message: 'Item not found' });
        const dataWithLink = data.map((article) => {
            return {
                ...article,
                links: {
                    read: '/read/'+article?.titleid
                }
        }})
        return res.status(200).json(
            {message: "Fetch success", data: dataWithLink})
    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        )
    }
}

export async function getByTitleId(req, res) {
    try {
        const titleid  = req.params.titleid;
        const data = await Articles.find({titleid});
        if (!data) return res.status(404).json({ message: 'Item not found' });
        return res.status(200).json(
            {message: "Fetch by title success", data})
    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        )
    }
}

export async function searchArticle(req, res) {
    try {
        const search  = req.body.search;
        const data = await Articles.find({title: { $regex: '.*' + search + '.*' } });
        if (!data) return res.status(404).json({ message: 'Item not found' });
        return res.status(200).json(
            {message: "Fetch by title success", data})
    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        )
    }
}

export async function updateById(req, res) {
    try {
        const data = await Articles.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!data) return res.status(404).json({ message: 'Item not found' });
        return res.status(200).json(
            {message: "update success", data});
    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        );
    }
}

export async function deleteById(req, res) {
    try {
        const id  = req.params.id;
        const data = await Articles.findByIdAndDelete(id);
        if(!data) return res.status(404).json({message: "Item not found"});
        return res.status(200).json(
            {message: "Delete success", data});
    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        );
    }
}


