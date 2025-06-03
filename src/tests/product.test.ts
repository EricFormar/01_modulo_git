import { describe, expect, it, beforeEach } from 'vitest'
import request from 'supertest'
import index from '../../src/index'

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