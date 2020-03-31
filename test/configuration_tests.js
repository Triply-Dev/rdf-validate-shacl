/* eslint-env mocha */
const assert = require('assert')
const path = require('path')
const rdf = require('rdf-ext')
const rdfFS = require('rdf-utils-fs')
const SHACLValidator = require('../index')

describe('configuration', () => {
  it('stops after `maxErrors` is reached', async () => {
    const dataFile = path.join(__dirname, '/data/core/property/class-001.test.ttl')
    const data = await rdf.dataset().import(rdfFS.fromFile(dataFile))
    const shapes = data

    const validator1 = new SHACLValidator(shapes)
    const report1 = validator1.validate(data)
    assert.strictEqual(report1.conforms, false)
    assert.strictEqual(report1.results.length, 2)

    const validator2 = new SHACLValidator(shapes, { maxErrors: 1 })
    const report2 = validator2.validate(data)
    assert.strictEqual(report2.conforms, false)
    assert.strictEqual(report2.results.length, 1)
  })
})
