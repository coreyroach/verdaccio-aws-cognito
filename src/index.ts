import AWSCognito from './awscognito';

/**
 * A new instance of AWSCognito class.
 * @param {object} config
 * @param {object} stuff
 * @returns {object}
 */
export default function(config, stuff) {
  return new AWSCognito(config, stuff);
}
