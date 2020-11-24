import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController Trainings (e2e)', () => {
  let app: INestApplication;
  let idForTestUser: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('POST add training', async () => {
    const res = await request(app.getHttpServer())
      .post('/trainings/')
      .set('key', process.env.SECRET_KEY)
      .send({
        userId: 'TestUser',
        trainingDate: '01012020',
        time: 123,
        distance: 456,
        calories: 789,
        description: 'Test description',
      });

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('id');

    idForTestUser = res.body.id;
  });

  it('GET all trainings', async () => {
    const res = await request(app.getHttpServer())
      .get('/trainings/')
      .set('key', process.env.SECRET_KEY);
    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('trainingDate');
    expect(res.body[0]).toHaveProperty('time');
    expect(res.body[0]).toHaveProperty('distance');
    expect(res.body[0]).toHaveProperty('calories');
    expect(res.body[0]).toHaveProperty('description');
  });

  it('GET trainings for specify user', async () => {
    const res = await request(app.getHttpServer())
      .get('/trainings/user/TestUser')
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('trainingDate');
    expect(res.body[0]).toHaveProperty('time');
    expect(res.body[0]).toHaveProperty('distance');
    expect(res.body[0]).toHaveProperty('calories');
    expect(res.body[0]).toHaveProperty('description');
  });

  it('GET specify single training for specify user', async () => {
    const res = await request(app.getHttpServer())
      .get(`/trainings/user/TestUser/id/${idForTestUser}`)
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('userId', 'TestUser');
    expect(res.body).toHaveProperty('trainingDate', '01012020');
    expect(res.body).toHaveProperty('time', 123);
    expect(res.body).toHaveProperty('distance', 456);
    expect(res.body).toHaveProperty('calories', 789);
    expect(res.body).toHaveProperty('description', 'Test description');
  });

  it('GET non-exist single training for non-exist specify user', async () => {
    const res = await request(app.getHttpServer())
      .get('/trainings/user/nonexisttestuser/id/nonexistid')
      .set('key', process.env.SECRET_KEY);

    expect(res.body.message).toEqual('Could not find training or user.');
  });

  it('GET first training for specify user', async () => {
    const res = await request(app.getHttpServer())
      .get('/trainings/first/user/TestUser/')
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('trainingDate');
    expect(res.body[0]).toHaveProperty('time');
    expect(res.body[0]).toHaveProperty('distance');
    expect(res.body[0]).toHaveProperty('calories');
    expect(res.body[0]).toHaveProperty('description');
  });

  it('GET last training for specify user', async () => {
    const res = await request(app.getHttpServer())
      .get('/trainings/last/user/TestUser/')
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('trainingDate');
    expect(res.body[0]).toHaveProperty('time');
    expect(res.body[0]).toHaveProperty('distance');
    expect(res.body[0]).toHaveProperty('calories');
    expect(res.body[0]).toHaveProperty('description');
  });

  it('GET training with the largest amount of calories for specify user and specify year', async () => {
    const res = await request(app.getHttpServer())
      .get('/trainings/calories/user/TestUser/year/2020')
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('trainingDate');
    expect(res.body[0]).toHaveProperty('time');
    expect(res.body[0]).toHaveProperty('distance');
    expect(res.body[0]).toHaveProperty('calories');
    expect(res.body[0]).toHaveProperty('description');
  });

  it('GET training with the largest amount of distance for specify user and specify year', async () => {
    const res = await request(app.getHttpServer())
      .get('/trainings/distance/user/TestUser/year/2020')
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('trainingDate');
    expect(res.body[0]).toHaveProperty('time');
    expect(res.body[0]).toHaveProperty('distance');
    expect(res.body[0]).toHaveProperty('calories');
    expect(res.body[0]).toHaveProperty('description');
  });

  it('GET training with the largest amount of time for specify user and specify year', async () => {
    const res = await request(app.getHttpServer())
      .get('/trainings/time/user/TestUser/year/2020')
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('trainingDate');
    expect(res.body[0]).toHaveProperty('time');
    expect(res.body[0]).toHaveProperty('distance');
    expect(res.body[0]).toHaveProperty('calories');
    expect(res.body[0]).toHaveProperty('description');
  });

  it('GET sum of trainings for specify user and specify year', async () => {
    const res = await request(app.getHttpServer())
      .get('/trainings/sum/user/TestUser/year/2020')
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('time', 123);
    expect(res.body[0]).toHaveProperty('distance', 456);
    expect(res.body[0]).toHaveProperty('calories', 789);
  });

  it('GET sum of trainings for specify user and specify year', async () => {
    const res = await request(app.getHttpServer())
      .get('/trainings/sum/user/TestUser/year/2020/month/01')
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('time', 123);
    expect(res.body[0]).toHaveProperty('distance', 456);
    expect(res.body[0]).toHaveProperty('calories', 789);
  });

  it('PATCH update training', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/trainings/user/TestUser/id/${idForTestUser}`)
      .send({
        time: 1234,
        distance: 5678,
        calories: 9123,
        description: 'New test description',
      })
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({});
  });

  it('DELETE single training for specify user', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/trainings/user/TestUser/id/${idForTestUser}`)
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({});
  });
});
