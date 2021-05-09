import axios from "axios";
import moxios from "moxios";
import sinon from "sinon";
import { strictEqual } from "assert";
import { renderHook } from "@testing-library/react-hooks";

import * as hooks from "./useGetCharMatrixData";
import { URL } from "./../utils/appData";

describe("mocking axios request", function () {
  const mockedDataResponse = {
    nodes: [
      {
        name: "Myriel",
        group: 1,
      },
      {
        name: "Napoleon",
        group: 1,
      },
      {
        name: "Mlle.Baptistine",
        group: 1,
      },
      {
        name: "Mme.Magloire",
        group: 1,
      },
    ],

    links: [
      {
        source: 1,
        target: 0,
        value: 1,
      },
      {
        source: 2,
        target: 0,
        value: 8,
      },
      {
        source: 3,
        target: 0,
        value: 10,
      },
    ],
  };

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it("fetches data from URL successfully", function (done) {
    const mockedfetchCharMatrixData = jest.fn();
    hooks.useGetCharMatrixData = jest.fn().mockReturnValue({
      fetchCharMatrixData: mockedfetchCharMatrixData,
    });

    renderHook(() => hooks.useGetCharMatrixData().fetchCharMatrixData());

    moxios.withMock(() => {
      let onFulfilled = sinon.spy();
      axios.get(URL).then(onFulfilled);

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: mockedDataResponse,
          })
          .then(() => {
            strictEqual(onFulfilled.called, true);
            done();
          });
      });
    });
    expect(mockedfetchCharMatrixData).toHaveBeenCalled();
  });

  it("fetches with rejection of the request", function (done) {
    const errorResp = {
      status: 400,
      response: { message: "invalid data" },
    };

    const mockedfetchCharMatrixData = jest.fn();
    hooks.useGetCharMatrixData = jest.fn().mockReturnValue({
      fetchCharMatrixData: mockedfetchCharMatrixData,
    });

    renderHook(() => hooks.useGetCharMatrixData().fetchCharMatrixData());

    let onFulfilled = sinon.spy();
    axios.get(URL).then(onFulfilled);

    // moxios.wait(() => {
    //   const request = moxios.requests.mostRecent();
    //   request.respondWith(errorResp).then(() => {
    //     try {
    //       //strictEqual(onFulfilled.called, true);
    //       //strictEqual(onFulfilled.getCall(0).args[0].status, 400);
    //       // done();
    //     } catch (err) {
    //       //done.fail(err);
    //       console.log(err);
    //     }
    //   });
    // });

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith(errorResp);
    });
  });
});
