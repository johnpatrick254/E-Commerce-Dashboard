import { Response, Request } from "express";
import { connection } from "../../config/ormconfig";
import { Product } from "../entities/product.entity";

export const fetchAllProducts = async (req: Request, res: Response) => {
    try {
        let pageNumber: number = parseInt(req.query.page as string || "1")
        let category:string | undefined = req.query.category as string | undefined
        const take = 20;

        const repository = connection.getRepository(Product);
        const { "0": products, "1": totals } = await repository.findAndCount({
            take: take,
            skip: ((pageNumber - 1) * take),
            where:{category:category}
        })

        res.status(200).send(
            {
                data: products,
                meta: {
                    total: totals,
                    page: pageNumber,
                    last_page: Math.ceil(totals / take)
                }

            }
        );

    } catch (err) {

        return res.status(502).json({ message: err });
    }

}
export const createProduct = async (req: Request, res: Response) => {
    const { name, description, image, price, category, original_price } = req.body
    try {
        const repository = connection.getRepository(Product);
        const product = await repository.save({
            name: name,
            description: description,
            image: image,
            price: price,
            category: category,
            original_price: original_price
        })
        res.status(200).send(product);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }

}

export const fetchOneProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const repository = connection.getRepository(Product);
        const fetchedData = await repository.findOne({ where: { id: +id } })
        if (!fetchedData) return res.status(404).send({ message: "product not found" })
            ;
        res.status(200).send(fetchedData);

    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }

}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const repository = connection.getRepository(Product);

        const product = await repository.save({
            id: +id,
            ...req.body,

        })
        res.status(200).send(product);

    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
}
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const repository = connection.getRepository(Product);
        await repository.delete(id)
        res.status(200).send(null);


    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
}