// src/services/semanticService.js
// This is optional but included per your bonus requirement

import { DataFactory } from 'n3';
const { namedNode, literal, quad } = DataFactory;
import N3 from 'n3';
import { Readable } from 'stream';

const store = new N3.Store();

exports.addProductToOntology = (product) => {
  const subject = namedNode(`http://farm.local/product/${product._id}`);
  const quads = [
    quad(subject, namedNode('http://schema.org/name'), literal(product.name)),
    quad(subject, namedNode('http://schema.org/price'), literal(product.price.toString())),
    quad(subject, namedNode('http://schema.org/category'), literal(product.category || '')),
  ];
  store.addQuads(quads);
};

exports.queryProducts = (predicate, value) => {
  return store.getQuads(null, namedNode(predicate), literal(value));
};
