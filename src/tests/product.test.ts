import { describe, expect, it, beforeEach } from 'vitest'
import request from 'supertest'
import index from '../../src/index'


describe('GET /api/productos', () => {
    it('debe retornar todos los productos', async () => {
        const response = await request(index)
            .get('/api/productos')
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)
    })
})

describe('POST /productos', () => {
    beforeEach(() => {
    });

    it('Debe crear un nuevo producto', async () => {
        
        const nuevoProducto = {
            nombre: "Tablet",
            precio: 499.99,
            descripcion: "Tablet Android"
        }

        const response = await request(index)
            .post('/api/productos')
            .send(nuevoProducto)
            .expect(201)

        expect(response.body).toMatchObject(nuevoProducto)
        expect(response.body).toHaveProperty('id')
    })

})