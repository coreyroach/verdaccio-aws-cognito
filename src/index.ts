import AWSCognito from './awscognito';

/**
 * A new instance of AWSCognito class.
 * @param {object} config
 * @returns {object}
 */
export default function(config): AWSCognito {
  return new AWSCognito(config);
}
