const MongoLib = require('../lib/mongo');
const Boom = require('@hapi/boom');

//Utils
const { formaterDate } = require('../utils/utils');

class TestService {
  constructor() {
    (this.TestModel = 'Test'), (this.mongoDb = new MongoLib());
  }

  async getTests() {
    const tests = await this.mongoDb.getAll(this.TestModel);
    return tests || [];
  }

  async getTestByIdUser(id_user) {
    try {
      const testByUser = this.mongoDb.getOne(this.TestModel, {
        id_user: id_user,
      });
      return testByUser;
    } catch (error) {
      return error;
    }
  }

  async createTest({ data }) {
    const { id_user, test } = data;
    let result = {};

    // //calculate result questions test
    if (
      test.question_1 === true &&
      test.question_2 === true &&
      this.verifyQuestions(test.question_3) > 0 &&
      this.verifyQuestions(test.question_4) > 0
    ) {
      result = {
        alert: 'Roja',
        message:
          'presentas signos de alarma relacionados con el coronavirus y podrías necesitar apoyo. Solicita atención médica inmediatamente.',
      };
    } else if (test.question_1 === true && test.question_2 === false) {
      if (
        (this.verifyQuestions(test.question_3) > 0 &&
          this.verifyQuestions(test.question_4) === 0) ||
        (this.verifyQuestions(test.question_3) === 0 &&
          this.verifyQuestions(test.question_4) === 0)
      ) {
        result = {
          alert: 'Amarilla',
          message: `presentas síntomas o factores de riesgo del coronavirus. sigue las recomendaciones y guarda reposo en casa, si alguno de estos síntomas empeora
          acude a tu médico`,
        };
      }
    } else if (test.question_1 === false && test.question_2 === true) {
      if (
        this.verifyQuestions(test.question_3) > 0 &&
        this.verifyQuestions(test.question_4) === 0
      ) {
        result = {
          alert: 'Amarilla',
          message: `presentas síntomas o factores de riesgo del coronavirus. sigue las recomendaciones y guarda reposo en casa, si alguno de estos síntomas empeora
          acude a tu médico`,
        };
      } else if (
        this.verifyQuestions(test.question_3) > 0 &&
        this.verifyQuestions(test.question_4) > 0
      ) {
        result = {
          alert: 'Roja',
          message:
            'presentas signos de alarma relacionados con el coronavirus y podrías necesitar apoyo. Solicita atención médica inmediatamente.',
        };
      }
    } else if (
      test.question_1 === false &&
      test.question_2 === false &&
      this.verifyQuestions(test.question_3) === 0 &&
      this.verifyQuestions(test.question_4) === 0
    ) {
      result = {
        alert: 'Verde',
        message: `Actualmente no presentas síntomas relacionados con el coronavirus, pero no bajes la guardia, conserva todas las precausiones al salir de casa
          si es extrictamente necesario.`,
      };
    } else {
      result = {
        alert: 'Verde',
        message: `Actualmente no presentas síntomas relacionados con el coronavirus, pero no bajes la guardia, conserva todas las precausiones al salir de casa
          si es extrictamente necesario.`,
      };
    }

    const testByUser = await this.getTestByIdUser(id_user);
    //if is =null create a new test
    if (testByUser === null) {
      try {
        const testUser = await this.mongoDb.create(this.TestModel, {
          id_user,
          test: { ...test, result },
        });
        return testUser.test[0].result;
      } catch (error) {
        return error;
      }
    } else {
      //user alreadey has tests

      //verify that not insert test in the same date
      if (
        formaterDate(testByUser.test.pop().date, 'YYYY-MM-DD') ===
        formaterDate(test.date, 'YYYY-MM-DD')
      ) {
        throw Boom.badRequest('Solo se permite un hacer un test por día.');
      }

      //Add test of user
      try {
        const updateTest = await this.mongoDb.update(
          this.TestModel,
          testByUser._id,
          { $push: { test: { ...test, result } } }
        );

        return result;
      } catch (error) {
        return error;
      }
    }
  }

  /**
   * Function  that count in the questions the responses true
   * @param {Object} question
   * @returns {count} integer
   */

  verifyQuestions(question) {
    let count = 0;
    for (const key in question) {
      if (question[key] === true) count++;
    }

    return count;
  }
}

module.exports = TestService;
