"use strict";

describe('ProjectService', function() {

    var service;
    var map;

    beforeAll(function() {
        ProjectService.projectList = {
            project1: {
                id: 1,
                spp_name: "Project 1",
                db_name: false,
                hasData: true,
                contact: "some-website.com",
                hasLogin: true
            },
            project2: {
                id: 2,
                spp_name: "The Second Project",
                db_name: "Project 2",  // auch extern/Binnenhäfen
                hasData: false,
                contact: "some-website.com",
                hasLogin: true
            },
            project3: {
                id: 3,
                spp_name: "The Third Project",
                db_name: "Project 3",
                hasData: true,
                contact: "some-website.com",
                hasLogin: false
            }
        }
    });

    it("should be defined", function() {
        expect(ProjectService).toBeDefined();
    });

    it("getProjectByName() should return correct project", function() {
        var project = ProjectService.getProjectByDbName("Project 2");
        expect(project.id).toBe(2);
    });

    it("should return all projects that have data", function() {
        var projects = ProjectService.getProjectsWithData();
        expect(projects.length).toBe(2);
    });

    it("should return all projects that have a db_name", function() {
        var projects = ProjectService.getProjectsWithDbName();
        expect(projects.length).toBe(2);
    });



});
