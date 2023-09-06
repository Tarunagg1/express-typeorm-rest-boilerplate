const limiter = require('./rate-limiter');
const cors = require('cors');
const helmet = require('helmet');
const methodOverride = require('method-override');
const compression = require('compression');


module.exports = app => {
    app.use(limiter);
    app.use(helmet());
    app.disable('x-powered-by');


    app.use(cors({
        origin: '*'
    }
    ));

    app.use(
        methodOverride(req => {
            if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                // look in urlencoded POST bodies and delete it
                var method = req.body._method;
                delete req.body._method;
                return method;
            }
        })
    );

    app.use(
        compression({
            threshold: 512
        })
    );

}